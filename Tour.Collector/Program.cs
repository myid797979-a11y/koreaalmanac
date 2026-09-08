using System.Text.Json;
using Dapper;
using Tour.Core;

var cfg = AppSettings.Load();
const int DailyBudget = 950;   // 개발계정 서비스(언어)별 1,000/일 — 여유분 50

switch (args.FirstOrDefault())
{
    case "init":
    {
        using var conn = Db.Open(cfg);
        conn.Execute(File.ReadAllText(FindUp("db/schema.sql")));
        Console.WriteLine("스키마 적용 완료");
        break;
    }

    // festivals [kor|eng|all] — searchFestival2 목록 전량 (100건/페이지, 언어당 3~10콜)
    case "festivals":
    {
        var langs = LangArg(args) is { } l ? new[] { l } : ["kor", "eng"];
        using var conn = Db.Open(cfg);
        conn.Execute(File.ReadAllText(FindUp("db/schema.sql")));   // idempotent

        foreach (var lang in langs)
        {
            var api = new TourApi(cfg.ApiKeyEncoded, lang);
            int page = 1, saved = 0, total;
            do
            {
                Spend(conn, lang, 1);
                var (items, t) = await api.Get("searchFestival2", "&eventStartDate=20000101", page);
                total = t;
                foreach (var it in items)
                {
                    conn.Execute("""
                        insert into raw_item (lang, contentid, contenttypeid, list_json)
                        values (@lang, @id, @ct, @json::jsonb)
                        on conflict (lang, contentid)
                        do update set list_json = excluded.list_json, listed_at = now()
                        """,
                        new { lang, id = it.GetProperty("contentid").GetString(),
                              ct = it.GetProperty("contenttypeid").GetString(),
                              json = it.GetRawText() });
                    saved++;
                }
                page++;
                await Task.Delay(80);
            } while ((page - 1) * 100 < total);
            Console.WriteLine($"[{lang}] 축제 목록 {saved:N0}건 적재 (API totalCount {total:N0})");
        }
        break;
    }

    // details [kor|eng] [limit] — 상세 2콜/건 (detailCommon2 + detailIntro2)
    //   우선순위: 진행중·예정(종료일 >= 오늘) 먼저, 그다음 시작일 역순(최근 과거 먼저)
    case "details":
    {
        var lang = LangArg(args) ?? "kor";
        var limitItems = args.Skip(1).Where(a => int.TryParse(a, out _)).Select(int.Parse).FirstOrDefault(int.MaxValue);
        using var conn = Db.Open(cfg);
        var api = new TourApi(cfg.ApiKeyEncoded, lang);

        var todo = conn.Query<(string Id, string Ct)>("""
            select contentid, contenttypeid from raw_item
            where lang = @lang and detailed_at is null
            order by (coalesce(list_json->>'eventenddate','00000000') >= to_char(current_date,'YYYYMMDD')) desc,
                     list_json->>'eventstartdate' desc
            """, new { lang }).ToList();

        int done = 0;
        foreach (var (id, ct) in todo)
        {
            if (done >= limitItems) break;
            if (Used(conn, lang) + 2 > DailyBudget)
            {
                Console.WriteLine($"⚠ [{lang}] 일일 예산({DailyBudget}콜) 도달 — 내일 다시 실행하면 이어서 받습니다.");
                break;
            }
            Spend(conn, lang, 2);
            var (c, _) = await api.Get("detailCommon2", $"&contentId={id}", rows: 10);
            var (i, _) = await api.Get("detailIntro2", $"&contentId={id}&contentTypeId={ct}", rows: 10);
            conn.Execute("""
                update raw_item set common_json = @c::jsonb, intro_json = @i::jsonb, detailed_at = now()
                where lang = @lang and contentid = @id
                """,
                new { lang, id,
                      c = c.Length > 0 ? c[0].GetRawText() : "{}",
                      i = i.Length > 0 ? i[0].GetRawText() : "{}" });
            done++;
            if (done % 50 == 0) Console.WriteLine($"  [{lang}] 상세 {done:N0} / {todo.Count:N0}");
            await Task.Delay(80);
        }
        Console.WriteLine($"[{lang}] 상세 수집 {done:N0}건 완료 · 남은 미수집 {todo.Count - done:N0}건 · 오늘 사용 {Used(conn, lang):N0}콜");
        break;
    }

    // images [kor|eng] [n] — 상세 완료 항목의 사진 갤러리 (detailImage2, 1콜/건, 예산 내 드레인)
    case "images":
    {
        var lang = LangArg(args) ?? "kor";
        var limitItems = args.Skip(1).Where(a => int.TryParse(a, out _)).Select(int.Parse).FirstOrDefault(int.MaxValue);
        using var conn = Db.Open(cfg);
        var api = new TourApi(cfg.ApiKeyEncoded, lang);
        var todo = conn.Query<string>("""
            select contentid from raw_item
            where lang = @lang and detailed_at is not null and images_json is null
            order by (coalesce(list_json->>'eventenddate','00000000') >= to_char(current_date,'YYYYMMDD')) desc,
                     list_json->>'eventstartdate' desc
            """, new { lang }).ToList();

        int done = 0;
        foreach (var id in todo)
        {
            if (done >= limitItems) break;
            if (Used(conn, lang) + 1 > DailyBudget)
            {
                Console.WriteLine($"⚠ [{lang}] 일일 예산 도달 — 내일 이어서 (남은 {todo.Count - done:N0}건)");
                break;
            }
            Spend(conn, lang, 1);
            var (items, _) = await api.Get("detailImage2", $"&contentId={id}&imageYN=Y", rows: 20);
            var arr = "[" + string.Join(",", items.Select(x => x.GetRawText())) + "]";
            conn.Execute("update raw_item set images_json = @a::jsonb where lang = @lang and contentid = @id",
                new { lang, id, a = arr });
            done++;
            if (done % 50 == 0) Console.WriteLine($"  [{lang}] 이미지 {done:N0} / {todo.Count:N0}");
            await Task.Delay(80);
        }
        Console.WriteLine($"[{lang}] 이미지 수집 {done:N0}건 · 남은 미수집 {todo.Count - done:N0}건 · 오늘 사용 {Used(conn, lang):N0}콜");
        break;
    }

    // dump/restore — GitHub Actions의 임시 PG용. 수집분을 repo(db/dump)에 담아
    // 매일 전량 재수집(쿼터 초과)을 피하고 증분만 API로 받는다.
    case "dump":
    {
        using var conn = Db.Open(cfg);
        var rows = conn.Query<(string Lang, string Id, string Ct, string List, string? Common, string? Intro, string? Img, DateTime? Det)>(
            "select lang, contentid, contenttypeid, list_json::text, common_json::text, intro_json::text, images_json::text, detailed_at from raw_item");
        var dir = Path.Combine(Path.GetDirectoryName(FindUp("db/schema.sql"))!, "dump");
        Directory.CreateDirectory(dir);
        var path = Path.Combine(dir, "raw_item.jsonl.gz");
        using (var fs = File.Create(path))
        using (var gz = new System.IO.Compression.GZipStream(fs, System.IO.Compression.CompressionLevel.Optimal))
        using (var w = new StreamWriter(gz))
        {
            var n = 0;
            foreach (var r in rows)
            {
                w.WriteLine(JsonSerializer.Serialize(new
                {
                    r.Lang, r.Id, r.Ct, r.List, r.Common, r.Intro, r.Img,
                    Det = r.Det?.ToString("O"),
                }));
                n++;
            }
            Console.WriteLine($"덤프 {n:N0}건 → db/dump/raw_item.jsonl.gz");
        }
        break;
    }

    case "restore":
    {
        var path = FindUpOrNull("db/dump/raw_item.jsonl.gz");
        if (path == null) { Console.WriteLine("덤프 없음 — 첫 실행으로 간주"); break; }
        using var conn = Db.Open(cfg);
        conn.Execute(File.ReadAllText(FindUp("db/schema.sql")));   // idempotent
        using var fs = File.OpenRead(path);
        using var gz = new System.IO.Compression.GZipStream(fs, System.IO.Compression.CompressionMode.Decompress);
        using var rd = new StreamReader(gz);
        var n = 0;
        string? line;
        while ((line = rd.ReadLine()) != null)
        {
            if (string.IsNullOrWhiteSpace(line)) continue;
            using var doc = JsonDocument.Parse(line);
            var e = doc.RootElement;
            string? S(string name) => e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.String ? v.GetString() : null;
            conn.Execute("""
                insert into raw_item (lang, contentid, contenttypeid, list_json, common_json, intro_json, images_json, detailed_at)
                values (@lang, @id, @ct, @list::jsonb, @common::jsonb, @intro::jsonb, @img::jsonb, @det)
                on conflict (lang, contentid) do update set
                  list_json = excluded.list_json, common_json = excluded.common_json,
                  intro_json = excluded.intro_json, images_json = excluded.images_json,
                  detailed_at = excluded.detailed_at
                """,
                new
                {
                    lang = S("Lang"), id = S("Id"), ct = S("Ct"), list = S("List"),
                    common = S("Common"), intro = S("Intro"), img = S("Img"),
                    det = S("Det") is { } d ? DateTime.Parse(d).ToUniversalTime() : (DateTime?)null,
                });
            n++;
        }
        Console.WriteLine($"복원 {n:N0}건");
        break;
    }

    case "stats":
    {
        using var conn = Db.Open(cfg);
        var rows = conn.Query<(string Lang, long N, long Detailed, long Upcoming)>("""
            select lang, count(*),
                   count(detailed_at),
                   count(*) filter (where coalesce(list_json->>'eventenddate','00000000') >= to_char(current_date,'YYYYMMDD'))
            from raw_item group by lang order by lang
            """);
        Console.WriteLine("언어 | 목록 | 상세완료 | 진행·예정");
        foreach (var r in rows)
            Console.WriteLine($"{r.Lang,4} | {r.N,5:N0} | {r.Detailed,7:N0} | {r.Upcoming,6:N0}");
        var calls = conn.Query<(string Lang, int Calls)>(
            "select lang, calls from api_call_log where day = current_date");
        foreach (var c in calls) Console.WriteLine($"오늘 API 사용 [{c.Lang}] {c.Calls:N0}콜");
        break;
    }

    default:
        Console.WriteLine("""
            사용법: dotnet run --project Tour.Collector -- <command>
              init                 스키마 적용
              festivals [kor|eng]  축제 목록 전량 수집 (기본: 둘 다)
              details <kor|eng> [n] 상세 수집 (일일 예산 내에서, 진행·예정 우선)
              stats                적재 현황
            """);
        break;
}

static string? LangArg(string[] a) => a.Skip(1).FirstOrDefault(x => x is "kor" or "eng");

static int Used(Npgsql.NpgsqlConnection conn, string lang) =>
    conn.ExecuteScalar<int?>("select calls from api_call_log where day = current_date and lang = @lang",
        new { lang }) ?? 0;

static void Spend(Npgsql.NpgsqlConnection conn, string lang, int n) =>
    conn.Execute("""
        insert into api_call_log (day, lang, calls) values (current_date, @lang, @n)
        on conflict (day, lang) do update set calls = api_call_log.calls + @n
        """, new { lang, n });

static string FindUp(string rel) =>
    FindUpOrNull(rel) ?? throw new FileNotFoundException(rel);

static string? FindUpOrNull(string rel)
{
    var dir = Directory.GetCurrentDirectory();
    while (dir != null)
    {
        var p = Path.Combine(dir, rel);
        if (File.Exists(p)) return p;
        dir = Path.GetDirectoryName(dir);
    }
    return null;
}
