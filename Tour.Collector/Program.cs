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

    // culture — 한국문화정보원 문화정보(국악·전통공연·전시). Postgres 대신 db/culture.json 에 보존.
    // 축제 파이프라인과 분리해 기존 수집에 영향이 없게 한다. 일 10,000콜이라 매일 전량 재조회.
    case "culture":
    {
        var capi = new CultureApi(cfg.ApiKeyEncoded);
        var outPath = Path.Combine(Path.GetDirectoryName(FindUp("db/schema.sql"))!, "culture.json");

        var store = File.Exists(outPath)
            ? JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string>>>(File.ReadAllText(outPath))!
            : new Dictionary<string, Dictionary<string, string>>();

        var from = DateTime.UtcNow.AddHours(9).ToString("yyyyMMdd");
        var to = DateTime.UtcNow.AddHours(9).AddYears(1).ToString("yyyyMMdd");
        var seen = new HashSet<string>();
        var calls = 0;

        foreach (var tp in new[] { "A", "B", "C" })
        {
            for (var page = 1; page <= 5; page++)
            {
                var (items, _) = await capi.Period(tp, from, to, page);
                calls++;
                foreach (var it in items)
                {
                    var seq = it["seq"];
                    seen.Add(seq);
                    if (store.TryGetValue(seq, out var prev))
                        foreach (var kv in it) prev[kv.Key] = kv.Value;   // 목록 필드 갱신, 상세는 보존
                    else
                        store[seq] = new Dictionary<string, string>(it);
                }
                if (items.Count < 1000) break;
            }
        }
        Console.WriteLine($"목록 {seen.Count:N0}건 ({calls}콜)");

        // 지난 항목 정리 — 종료일이 오늘보다 이전이면 제거
        var today = from;
        var stale = store.Where(kv => kv.Value.GetValueOrDefault("endDate", "99999999").CompareTo(today) < 0)
                         .Select(kv => kv.Key).ToList();
        foreach (var k in stale) store.Remove(k);

        // 상세 미수집분 채우기 (예산 여유분 내에서)
        var need = store.Where(kv => !kv.Value.ContainsKey("_detailed")).Select(kv => kv.Key).Take(600).ToList();
        var got = 0;
        foreach (var seq in need)
        {
            var d = await capi.Detail(seq);
            calls++;
            if (d != null)
            {
                foreach (var kv in d) store[seq][kv.Key] = kv.Value;
                got++;
            }
            store[seq]["_detailed"] = "1";
        }

        var opts = new JsonSerializerOptions { WriteIndented = false, Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping };
        File.WriteAllText(outPath, JsonSerializer.Serialize(store.OrderBy(kv => kv.Key).ToDictionary(kv => kv.Key, kv => kv.Value), opts));
        Console.WriteLine($"culture.json  {store.Count:N0}건 (상세 신규 {got}건, 만료 정리 {stale.Count}건, 총 {calls}콜)");
        break;
    }

    // places — 영문 관광지(76)·문화시설(78). db/places.json 에 보존.
    // eng 쿼터를 축제와 공유하므로 목록은 하루 몇 콜, 상세(overview)는 예산 여유분만 소진.
    case "places":
    {
        var papi = new PlaceApi(cfg.ApiKeyEncoded);
        var outPath = Path.Combine(Path.GetDirectoryName(FindUp("db/schema.sql"))!, "places.json");
        var store = File.Exists(outPath)
            ? JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string>>>(File.ReadAllText(outPath))!
            : new Dictionary<string, Dictionary<string, string>>();

        using var conn = Db.Open(cfg);
        conn.Execute(File.ReadAllText(FindUp("db/schema.sql")));   // idempotent
        var used = Used(conn, "eng");
        // places 는 축제 파이프라인과 같은 키를 쓰므로 평소엔 같은 상한을 지킨다.
        // 다만 그날 축제 수집이 이미 끝난 뒤 관광지 소개문만 몰아 받고 싶을 때가 있어
        // PLACES_EXTRA 로 추가 콜을 허용한다 (쿼터는 자정 KST 에 초기화된다).
        var extra = int.TryParse(Environment.GetEnvironmentVariable("PLACES_EXTRA"), out var ex) ? ex : 0;
        var budget = Math.Max(0, DailyBudget + extra - used);
        Console.WriteLine($"eng 예산 잔여 {budget}콜 (오늘 사용 {used})");

        var calls = 0;
        // 76=관광지 78=문화시설 79=쇼핑 82=음식점.
        // 79 는 11,071건 중 99.5%가 택스리펀 가맹점(약국·안경점·아울렛 지점) 명부다.
        // 저장 단계에서 걸러낸다 — 남는 139건이 광장시장·자갈치 같은 실제 목적지다.
        foreach (var tid in new[] { 76, 78, 79, 82 })
        {
            var maxPage = tid == 79 ? 12 : 5;   // 79 만 11,071건(12페이지)
            for (var page = 1; page <= maxPage && calls < budget; page++)
            {
                var (items, _) = await papi.AreaBased(tid, page);
                calls++;
                foreach (var el in items)
                {
                    var id = el.TryGetProperty("contentid", out var cid) ? cid.GetString() : null;
                    if (id == null) continue;
                    if (tid == 79 && el.TryGetProperty("title", out var tt)
                        && (tt.GetString() ?? "").Contains("Tax Refund", StringComparison.OrdinalIgnoreCase)) continue;
                    var d = store.TryGetValue(id, out var prev) ? prev : new Dictionary<string, string>();
                    foreach (var pr in el.EnumerateObject())
                    {
                        var v = pr.Value.ValueKind == JsonValueKind.String ? pr.Value.GetString() : pr.Value.ToString();
                        if (!string.IsNullOrWhiteSpace(v)) d[pr.Name] = v!;
                    }
                    d["_ctype"] = tid.ToString();
                    store[id] = d;
                }
                if (items.Length < 1000) break;
            }
        }
        Console.WriteLine($"목록 {store.Count:N0}건 ({calls}콜)");

        // 소개문(overview) 미수집분 — 남은 예산만큼만
        // 새로 추가한 쇼핑(79)·음식점(82)부터 채운다 — 소개문이 통째로 비어 있어
        // 카드에 이름과 사진만 남는다. 관광지(76·78)는 이미 6할이 차 있다.
        var need = store.Where(kv => !kv.Value.ContainsKey("_detailed"))
            .OrderBy(kv => kv.Value.GetValueOrDefault("_ctype") is "79" or "82" ? 0 : 1)
            .ThenBy(kv => kv.Key)
            .Select(kv => kv.Key).ToList();
        var got = 0;
        foreach (var id in need)
        {
            if (calls >= budget) break;
            try
            {
                var det = await papi.Detail(id);
                calls++;
                if (det.HasValue && det.Value.TryGetProperty("overview", out var ov))
                {
                    var t = ov.GetString();
                    if (!string.IsNullOrWhiteSpace(t)) store[id]["overview"] = t!;
                }
                store[id]["_detailed"] = "1";
                got++;
            }
            catch (Exception e) { Console.WriteLine("  상세 실패 " + id + ": " + e.Message); break; }
        }

        // 개관시간·휴관일·입장료(detailIntro2) — 소개문과 별개 호출이라 따로 드레인한다.
        // "화요일 휴관"·"09:00-18:00"·"₩3,000" 이 없으면 관광지 페이지는
        // 여행자의 첫 질문(지금 열었나, 얼마인가)에 답하지 못한다.
        // 드레인 순서가 중요하다. contentid 를 문자열로 정렬하면 "1000149" < "264337" 이라
        // 경복궁·해운대·한라산 같은 264xxx 대표 명소가 맨 뒤로 밀린다 — 정확히 거꾸로다.
        // KTO 가 길게 써준 곳이 대체로 주요 명소이므로 소개문 길이를 우선 신호로 쓰고,
        // 그다음 contentid 를 숫자로 본다(초기 등록분 26xxxx 가 고전 명소다).
        var needIntro = store.Where(kv => !kv.Value.ContainsKey("_intro"))
            .OrderBy(kv => kv.Value.GetValueOrDefault("_ctype") is "79" or "82" ? 1 : 0)
            .ThenByDescending(kv => (kv.Value.GetValueOrDefault("overview") ?? "").Length)
            .ThenBy(kv => long.TryParse(kv.Key, out var n) ? n : long.MaxValue)
            .Select(kv => kv.Key).ToList();
        var gotIntro = 0;
        foreach (var id in needIntro)
        {
            if (calls >= budget) break;
            try
            {
                var intro = await papi.Intro(id, store[id].GetValueOrDefault("_ctype") ?? "76");
                calls++;
                if (intro.HasValue)
                    foreach (var pr in intro.Value.EnumerateObject())
                    {
                        var v = pr.Value.ValueKind == JsonValueKind.String ? pr.Value.GetString() : pr.Value.ToString();
                        if (!string.IsNullOrWhiteSpace(v)) store[id]["i_" + pr.Name] = v!;
                    }
                store[id]["_intro"] = "1";
                gotIntro++;
            }
            catch (Exception e) { Console.WriteLine("  개관정보 실패 " + id + ": " + e.Message); break; }
        }

        Spend(conn, "eng", calls);
        var opts = new JsonSerializerOptions { WriteIndented = false, Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping };
        File.WriteAllText(outPath, JsonSerializer.Serialize(store.OrderBy(kv => kv.Key).ToDictionary(kv => kv.Key, kv => kv.Value), opts));
        var left = store.Count(kv => !kv.Value.ContainsKey("_detailed"));
        Console.WriteLine($"places.json   {store.Count:N0}건 (소개문 신규 {got}건, 남은 상세 {left}건 · 개관정보 신규 {gotIntro}건, 남은 {store.Count(kv => !kv.Value.ContainsKey("_intro")):N0}건 · 총 {calls}콜)");
        break;
    }

    // kopis — 공연예술통합전산망 수집 → db/kopis.json · db/kopis_venues.json
    //
    // KTO 축제가 못 채우는 영역(콘서트·뮤지컬·클래식·국악)을 맡는다. 공연 21건을 손으로
    // 관리하던 것을 대체하는 것이 목적이다 — 2027년 1~2월이 통째로 비어 있던 건 조사를
    // 못해서가 아니라 9월 시점에 발표 자체가 없었기 때문이고, 이 API 는 예매가 열리는
    // 즉시 받아온다.
    //
    // ⚠ 쿼리 한도가 공개돼 있지 않고 초과하면 서비스가 중지된다. 인증키는 1인 1개라
    //   재발급으로 복구하기 어려우므로, KTO(950/일)보다도 보수적으로 잡는다.
    case "kopis":
    {
        if (string.IsNullOrWhiteSpace(cfg.KopisKey))
        {
            Console.WriteLine("⚠ KOPIS_KEY 없음 — 건너뜁니다 (appsettings.local.json 또는 KOPIS_KEY 환경변수)");
            break;
        }

        var kapi = new KopisApi(cfg.KopisKey);
        var kdir = Path.GetDirectoryName(FindUp("db/schema.sql"))!;
        var showPath = Path.Combine(kdir, "kopis.json");
        var venuePath = Path.Combine(kdir, "kopis_venues.json");
        var shows = LoadStore(showPath);
        var venues = LoadStore(venuePath);

        var kbudget = int.TryParse(Environment.GetEnvironmentVariable("KOPIS_BUDGET"), out var kb) ? kb : 400;
        var kcalls = 0;

        // 대중음악(CCCD)만 받는다. 나머지는 실제 데이터를 받아 보고 뺐다 —
        // 되살리기 전에 아래를 먼저 읽을 것:
        //  · 클래식(CCCA, 930건): "제190회 한국독일가곡연구회 정기연주회" 같은 동호회·
        //    학생 독주회가 대부분이다. 해외 방문자가 한국까지 와서 볼 것이 아니다.
        //  · 뮤지컬(GGGA, 510건): 엘리자벳·드라큘라 등 서양 뮤지컬의 한국어 공연.
        //    언어 장벽이 그대로다. 넌버벌(점프·페인터즈)만 가치가 있는데 데이터에
        //    구분 필드가 없어 자동으로 못 고른다 — 필요하면 손으로 몇 건 넣는 편이 낫다.
        //  · 국악(CCCC, 164건): 관광객이 갈 만한 국립국악원 상설은 이미 문화정보 API
        //    (db/culture.json)가 커버한다. 중복이다.
        //  · 연극(AAAA): 대사 중심 한국어.
        var genres = new[] { ("CCCD", "대중음악") };

        // 지난주부터 — 이미 시작해 진행 중인 공연이 빠지면 안 된다.
        var kfrom = DateTime.Today.AddDays(-7).ToString("yyyyMMdd");
        var kto = DateTime.Today.AddDays(240).ToString("yyyyMMdd");

        foreach (var (code, gname) in genres)
        {
            var seen = 0;
            for (var page = 1; page <= 30 && kcalls < kbudget; page++)
            {
                var items = await kapi.List(kfrom, kto, code, page);
                kcalls++;
                foreach (var it in items)
                {
                    if (!it.TryGetValue("mt20id", out var id)) continue;
                    var d = shows.TryGetValue(id, out var prev) ? prev : new Dictionary<string, string>();
                    foreach (var kv in it) d[kv.Key] = kv.Value;
                    d["_cate"] = code;
                    shows[id] = d;
                    seen++;
                }
                if (items.Count < 100) break;
                await Task.Delay(80);
            }
            Console.WriteLine($"  [{gname}] 목록 {seen:N0}건");
        }
        Console.WriteLine($"공연 누적 {shows.Count:N0}건 (목록 {kcalls}콜)");

        // 공연장 좌표 — 이게 있어야 장소 상세의 "What's on nearby" 에 공연이 뜬다.
        // ⚠ seatscale 은 홀이 아니라 시설 전체 합이다 — 올림픽공원 41,376석(홀 12개),
        //   세종문화회관 5,372석(홀 8개). 440석짜리 체임버홀 공연이 5,372석으로 잡힌다.
        //   규모 필터로 쓸 수는 있지만 "좌석수"로 표시하면 거짓말이 된다.
        // 공연은 수천 건이지만 공연장은 수백 개뿐이라 금방 다 찬다.
        // ⚠ 상세보다 먼저 받아야 한다. 상세가 예산을 다 쓰면 공연장 차례가 영영 안 온다
        //   (첫 실행에서 상세 473건을 받고 공연장은 0곳이었다). 공연장은 수백 개뿐이라
        //   한 번 차면 더 들지 않고, 좌석수(seatscale)가 클럽 공연을 걸러내는 근거가 된다.
        var needVenue = shows.Values
            .Select(v => v.GetValueOrDefault("mt10id"))
            .Where(v => !string.IsNullOrEmpty(v) && !venues.ContainsKey(v!))
            .Distinct().ToList();

        var gotVenue = 0;
        foreach (var vid in needVenue)
        {
            if (kcalls >= kbudget) break;
            try
            {
                var v = await kapi.Venue(vid!);
                kcalls++;
                if (v is not null) venues[vid!] = v;
                gotVenue++;
                await Task.Delay(80);
            }
            catch (Exception e) { Console.WriteLine($"  공연장 실패 {vid}: {e.Message}"); break; }
        }

        // 상세 드레인 — 좌석별 가격·공연시간·출연·예매링크는 목록에 없다.
        // ⚠ 목록 창을 today-7 부터 잡기 때문에 이미 끝난 공연이 섞여 있다(첫 실행 기준 436건).
        //   시작일만으로 정렬하면 지난 공연부터 받아 호출을 통째로 버린다 — 종료 여부가 1순위다.
        // 순서: ①안 끝난 것 ②대중음악(수동 관리하던 공연 목록을 대체하는 게 급하다)
        //       ③시작일 빠른 순 — 여행자가 먼저 만나는 것부터.
        var ktoday = DateTime.Today.ToString("yyyy.MM.dd");
        var needDetail = shows
            .Where(kv => !kv.Value.ContainsKey("_detail"))
            .OrderBy(kv => string.CompareOrdinal(kv.Value.GetValueOrDefault("prfpdto") ?? "", ktoday) >= 0 ? 0 : 1)
            .ThenBy(kv => kv.Value.GetValueOrDefault("_cate") == "CCCD" ? 0 : 1)
            .ThenBy(kv => kv.Value.GetValueOrDefault("prfpdfrom") ?? "9999.99.99")
            .Select(kv => kv.Key).ToList();

        var gotDetail = 0;
        foreach (var id in needDetail)
        {
            if (kcalls >= kbudget) break;
            try
            {
                var det = await kapi.Detail(id);
                kcalls++;
                if (det is not null)
                    foreach (var kv in det) shows[id][kv.Key] = kv.Value;
                shows[id]["_detail"] = "1";
                gotDetail++;
                await Task.Delay(80);
            }
            catch (Exception e) { Console.WriteLine($"  상세 실패 {id}: {e.Message}"); break; }
        }

        SaveStore(showPath, shows);
        SaveStore(venuePath, venues);
        Console.WriteLine(
            $"kopis.json {shows.Count:N0}건 (상세 신규 {gotDetail}건, 남은 {needDetail.Count - gotDetail:N0}건) · "
            + $"공연장 {venues.Count:N0}곳 (신규 {gotVenue}곳, 남은 {needVenue.Count - gotVenue:N0}곳) · 총 {kcalls}콜");
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
              culture              문화정보(국악·전통공연·전시) 수집 → db/culture.json
              places               영문 관광지·문화시설 수집 → db/places.json
              kopis                공연예술통합전산망(콘서트·뮤지컬·클래식·국악) → db/kopis.json
              stats                적재 현황
            """);
        break;
}

// db/*.json 저장소 — id → 필드 사전. 축제(Postgres)와 달리 장소·공연은 파일로 관리한다
// (깃에 그대로 담겨 배포 파이프라인이 DB 없이도 돈다).
static Dictionary<string, Dictionary<string, string>> LoadStore(string path) =>
    File.Exists(path)
        ? JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string>>>(File.ReadAllText(path))!
        : new Dictionary<string, Dictionary<string, string>>();

static void SaveStore(string path, Dictionary<string, Dictionary<string, string>> store) =>
    File.WriteAllText(path, JsonSerializer.Serialize(store,
        new JsonSerializerOptions { WriteIndented = false, Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping }));
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
