using System.Text.Json;
using System.Text.RegularExpressions;
using Dapper;
using Tour.Core;

// 병합 원칙: ①영문 레코드 우선(공사 번역) ②영문 없는 국문은 커밋된 번역(data/translations)이
// 있으면 병합 ③둘 다 없으면 번역 큐로. (설계.md §3 "아무도 번역하지 않은 데이터")
var cfg = AppSettings.Load();
using var conn = Db.Open(cfg);
var root = FindRepoRoot();
var jsonOpt = new JsonSerializerOptions
{
    WriteIndented = false,
    Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
};

var regions = new Dictionary<string, string>
{
    ["11"] = "Seoul", ["26"] = "Busan", ["27"] = "Daegu", ["28"] = "Incheon",
    ["29"] = "Gwangju", ["30"] = "Daejeon", ["31"] = "Ulsan", ["36"] = "Sejong",
    ["41"] = "Gyeonggi", ["42"] = "Gangwon", ["51"] = "Gangwon", ["43"] = "Chungbuk",
    ["44"] = "Chungnam", ["45"] = "Jeonbuk", ["52"] = "Jeonbuk", ["46"] = "Jeonnam",
    ["47"] = "Gyeongbuk", ["48"] = "Gyeongnam", ["50"] = "Jeju",
};

var all = conn.Query<(string Lang, string Id, string List, string Common, string Intro, string Img)>("""
    select lang, contentid, list_json::text, coalesce(common_json::text,'{}'), coalesce(intro_json::text,'{}'),
           coalesce(images_json::text,'[]')
    from raw_item where detailed_at is not null
    """).Select(r =>
{
    var l = JsonDocument.Parse(r.List).RootElement;
    var c = JsonDocument.Parse(r.Common).RootElement;
    var i = JsonDocument.Parse(r.Intro).RootElement;
    var im = JsonDocument.Parse(r.Img).RootElement;
    return new Rec(r.Lang, r.Id, l, c, i, im);
}).ToList();

var kor = all.Where(r => r.Lang == "kor").ToList();
var eng = all.Where(r => r.Lang == "eng").ToList();

// ── 매칭: 영문 제목 괄호 안 한글 → 국문 제목 / 좌표 소수4자리
string NoSp(string s) => s.Replace(" ", "");
string? KorKey(string t)
{
    var idx = t.IndexOf('(');
    if (idx < 0) return null;
    var inner = t[idx..].Trim('(', ')', ' ');
    return inner.Length > 0 ? NoSp(inner) : null;
}
string? CoordKey(Rec r)
{
    var x = r.S("mapx"); var y = r.S("mapy");
    if (x == null || y == null) return null;
    return decimal.Round(decimal.Parse(x), 4) + "," + decimal.Round(decimal.Parse(y), 4);
}

var korByTitle = kor.GroupBy(k => NoSp(k.S("title") ?? "")).ToDictionary(g => g.Key, g => g.First());
var korByCoord = kor.Where(k => CoordKey(k) != null).GroupBy(CoordKey).ToDictionary(g => g.Key!, g => g.First());
var matchedKor = new HashSet<string>();
foreach (var e in eng)
{
    var kk = KorKey(e.S("title") ?? "");
    if (kk != null && korByTitle.TryGetValue(kk, out var m1)) { matchedKor.Add(m1.Id); continue; }
    var ck = CoordKey(e);
    if (ck != null && korByCoord.TryGetValue(ck, out var m2)) matchedKor.Add(m2.Id);
}

// ── 커밋된 번역 로드
// data/translations/*.json 전부 병합 (배치 단위 커밋 가능, 뒤 파일이 앞을 덮음)
var trDir = Path.Combine(root, "data", "translations");
var translations = new Dictionary<string, Dictionary<string, string?>>();
if (Directory.Exists(trDir))
    foreach (var file in Directory.GetFiles(trDir, "*.json").OrderBy(x => x))
        foreach (var kv in JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string?>>>(File.ReadAllText(file))!)
            translations[kv.Key] = kv.Value;

// ── 병합 출력
var fests = new List<Dictionary<string, object?>>();
foreach (var e in eng) fests.Add(Build(e, null));
int translated = 0;
var queue = new List<Dictionary<string, object?>>();
var todayStr = DateTime.UtcNow.AddHours(9).ToString("yyyyMMdd");

foreach (var k in kor.Where(k => !matchedKor.Contains(k.Id)))
{
    if (translations.TryGetValue(k.Id, out var tr)) { fests.Add(Build(k, tr)); translated++; }
    else queue.Add(new()
    {
        ["id"] = k.Id,
        ["active"] = string.Compare(k.S("eventenddate") ?? "00000000", todayStr, StringComparison.Ordinal) >= 0,
        ["start"] = k.S("eventstartdate"),
        ["title"] = k.S("title"),
        ["overview"] = Strip(k.C("overview")),
        ["addr"] = k.S("addr1"),
        ["place"] = k.I("eventplace"),
        ["fee"] = Strip(k.I("usetimefestival")),
        ["hours"] = Strip(k.I("playtime")),
        ["duration"] = k.I("spendtimefestival"),
        ["sponsor"] = k.I("sponsor1"),
    });
}

fests.Sort((a, b) => string.CompareOrdinal(a["start"] as string ?? "", b["start"] as string ?? ""));
queue = queue.OrderByDescending(q => (bool)q["active"]!)
             .ThenBy(q => q["start"] as string).ToList();

var webData = Path.Combine(root, "web", "data");
Directory.CreateDirectory(webData);
File.WriteAllText(Path.Combine(webData, "festivals.json"), JsonSerializer.Serialize(fests, jsonOpt));
File.WriteAllText(Path.Combine(root, "data", "translation_queue.json"),
    JsonSerializer.Serialize(queue, new JsonSerializerOptions { WriteIndented = true, Encoder = jsonOpt.Encoder }));

// 검색 인덱스 (헤더 검색박스용 슬림, ~40KB)
var pubDir = Path.Combine(root, "web", "public");
Directory.CreateDirectory(pubDir);
File.WriteAllText(Path.Combine(pubDir, "search-index.json"),
    JsonSerializer.Serialize(fests.Select(f => new
    {
        t = f["title"], s = f["slug"], r = f["region"], d = f["start"], e = f["end"],
    }), jsonOpt));

// 지역별 .ics 구독 피드 — 진행·예정 축제만, 매일 재생성
var feedDir = Path.Combine(pubDir, "feeds");
Directory.CreateDirectory(feedDir);
var CRLF = "" + (char)13 + (char)10;
var todayKst = DateTime.UtcNow.AddHours(9).ToString("yyyyMMdd");
string Ics(string name, IEnumerable<Dictionary<string, object?>> list)
{
    var lines = new List<string> { "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//KoreaAlmanac//EN", "X-WR-CALNAME:" + name };
    foreach (var f in list)
    {
        var start = f["start"] as string;
        var end = f["end"] as string ?? start;
        if (start == null || string.Compare(end, todayKst, StringComparison.Ordinal) < 0) continue;
        var dtEnd = DateTime.ParseExact(end!, "yyyyMMdd", null).AddDays(1).ToString("yyyyMMdd");
        lines.AddRange(new[]
        {
            "BEGIN:VEVENT",
            "UID:" + f["id"] + "@koreaalmanac",
            "DTSTART;VALUE=DATE:" + start,
            "DTEND;VALUE=DATE:" + dtEnd,
            "SUMMARY:" + (f["title"] as string)?.Replace(",", " "),
            "LOCATION:" + ((f["place"] ?? f["addr"] ?? f["region"]) as string)?.Replace(",", " "),
            "END:VEVENT",
        });
    }
    lines.Add("END:VCALENDAR");
    return string.Join(CRLF, lines);
}
File.WriteAllText(Path.Combine(feedDir, "all.ics"), Ics("Korea Festivals", fests));
foreach (var rg in regions.Values.Distinct())
    File.WriteAllText(Path.Combine(feedDir, rg.ToLowerInvariant() + ".ics"),
        Ics("Korea Festivals - " + rg, fests.Where(f => (string)f["region"]! == rg)));

Console.WriteLine($"""
    festivals.json      {fests.Count:N0}건 (영문 {eng.Count:N0} + 번역 병합 {translated:N0})
    translation_queue   {queue.Count:N0}건 (active {queue.Count(q => (bool)q["active"]!):N0})
    search-index + feeds ({regions.Values.Distinct().Count() + 1}개 .ics) 생성
    """);

Dictionary<string, object?> Build(Rec r, Dictionary<string, string?>? tr)
{
    var titleRaw = tr?.GetValueOrDefault("title") ?? r.S("title") ?? "";
    var title = CleanTitle(titleRaw);
    // 카테고리 태그 — 한·영 키워드 규칙 (titleFull엔 영문 항목도 괄호 한글이 있어 양쪽 다 잡힘)
    var tagText = (r.S("title") ?? "") + " " + title + " " + (r.I("eventplace") ?? "");
    return new()
    {
        ["tags"] = Tags(tagText),
        ["id"] = r.Id,
        ["slug"] = Slug(title) + "-" + r.Id,
        ["title"] = title,
        ["titleFull"] = r.S("title"),
        ["start"] = r.S("eventstartdate"),
        ["end"] = r.S("eventenddate"),
        ["region"] = regions.TryGetValue(r.S("lDongRegnCd") ?? "", out var rgn)
            ? rgn : RegionFromAddr(tr?.GetValueOrDefault("addr") ?? r.S("addr1")),
        ["addr"] = tr?.GetValueOrDefault("addr") ?? r.S("addr1"),
        ["mapx"] = r.S("mapx"),
        ["mapy"] = r.S("mapy"),
        ["image"] = r.S("firstimage") ?? r.S("firstimage2"),
        ["tel"] = tr?.GetValueOrDefault("tel") ?? r.S("tel"),
        ["overview"] = tr?.GetValueOrDefault("overview") ?? r.C("overview"),
        ["homepage"] = Href(r.C("homepage")),
        ["place"] = tr?.GetValueOrDefault("place") ?? r.I("eventplace") ?? r.S("addr2"),
        ["fee"] = tr?.GetValueOrDefault("fee") ?? Strip(r.I("usetimefestival")),
        ["hours"] = tr?.GetValueOrDefault("hours") ?? Strip(r.I("playtime")),
        ["duration"] = tr?.GetValueOrDefault("duration") ?? r.I("spendtimefestival"),
        ["sponsor"] = tr?.GetValueOrDefault("sponsor") ?? r.I("sponsor1"),
        ["mt"] = tr != null,   // 기계번역 표시 (페이지 하단 고지용)
        ["images"] = r.Images(8),
    };
}

// 카테고리 규칙 — 장식이 아니라 브라우징 축. 슬러그는 web의 CATEGORIES와 일치해야 함
string[] Tags(string text)
{
    var rules = new (string Slug, string[] Keys)[]
    {
        ("lights", new[] { "불꽃", "드론", "야행", "야경", "등불", "유등", "미디어아트", "루미나리에", "빛축제", "랜턴", "야간개장", "일루미", "firework", "drone", "lantern", "light show", "starlight", "night view" }),
        ("traditional", new[] { "문화제", "전통", "국악", "한옥", "궁", "수문장", "민속", "마당극", "농악", "탈춤", "산성", "읍성", "서원", "왕릉", "유교", "국가유산", "heritage", "palace", "royal", "traditional", "folk", "hanok", "gugak", "mask dance", "fortress", "confucian" }),
        ("music", new[] { "음악", "뮤직", "재즈", "버스킹", "콘서트", "밴드", "힙합", "가요", "합창", "오케스트라", "록페", "music", "jazz", "busking", "concert", "band", "hip-hop", "orchestra", "philharmonic" }),
        ("food", new[] { "음식", "먹거리", "맥주", "커피", "와인", "미식", "푸드", "장터", "수산", "한우", "사과", "포도", "인삼", "대추", "찐빵", "김치", "떡볶이", "율무", "명태", "새우", "산삼", "약수", "food", "beer", "coffee", "wine", "bbq", "gourmet", "seafood", "ginseng" }),
        ("nature", new[] { "꽃", "정원", "장미", "벚꽃", "단풍", "숲", "생태", "철쭉", "국화", "상사화", "연꽃", "메밀", "해변", "산림", "garden", "flower", "blossom", "foliage", "eco", "forest", "island", "beach", "sea road" }),
        ("art", new[] { "비엔날레", "미술", "전시", "아트", "사진", "영화", "디자인", "일러스트", "공예", "조각", "도자", "백자", "biennale", "art", "exhibition", "photo", "film festival", "design", "craft", "illustration", "ceramic" }),
        ("family", new[] { "어린이", "가족", "키즈", "공룡", "반려", "인형", "애니", "장난감", "과학", "우주", "children", "kids", "family", "dinosaur", "pet", "puppet", "toy", "alien" }),
    };
    return rules
        .Where(rule => rule.Keys.Any(k => text.Contains(k, StringComparison.OrdinalIgnoreCase)))
        .Select(rule => rule.Slug)
        .ToArray();
}

static string CleanTitle(string t)
{
    var idx = t.IndexOf('(');
    while (idx >= 0)
    {
        if (Regex.IsMatch(t[idx..], "[가-힣]")) return t[..idx].Trim();
        idx = t.IndexOf('(', idx + 1);
    }
    return t.Trim();
}

static string Slug(string s)
{
    var slug = Regex.Replace(s.ToLowerInvariant(), "[^a-z0-9]+", "-").Trim('-');
    return slug.Length > 60 ? slug[..60].Trim('-') : (slug.Length == 0 ? "festival" : slug);
}

static string? Strip(string? html) => html == null ? null
    : Nul(Regex.Replace(Regex.Replace(html, "<br[^>]*>", " · "), "<[^>]+>", ""));

// 홈페이지 필드엔 앵커 태그·평문 URL·"공식 홈페이지 https://..." 설명문이 섞여 온다.
// 링크로 쓸 수 있는 절대 URL만 뽑는다 (상대경로가 새어나가 깨진 링크가 되던 문제).
static string? Href(string? html)
{
    if (html == null) return null;

    var m = Regex.Match(html, "href=\u0022([^\u0022]+)\u0022");
    if (m.Success && m.Groups[1].Value.StartsWith("http", StringComparison.OrdinalIgnoreCase))
        return m.Groups[1].Value;

    var text = Regex.Replace(html, "<[^>]+>", " ");
    var url = Regex.Match(text, "https?://[^\\s\u0022'<>)]+");
    if (url.Success) return url.Value;

    var bare = Regex.Match(text, "(?:^|\\s)(www\\.[^\\s\u0022'<>)]+)");
    return bare.Success ? "https://" + bare.Groups[1].Value : null;
}

// lDongRegnCd 가 비어 오는 항목이 있어 지역이 "Korea"로 뭉개졌다 → 영문 주소로 보정.
static string RegionFromAddr(string? addr)
{
    if (string.IsNullOrWhiteSpace(addr)) return "Korea";
    var a = addr.ToLowerInvariant();
    if (a.Contains("seoul")) return "Seoul";
    if (a.Contains("busan")) return "Busan";
    if (a.Contains("incheon")) return "Incheon";
    if (a.Contains("daegu")) return "Daegu";
    if (a.Contains("daejeon")) return "Daejeon";
    if (a.Contains("ulsan")) return "Ulsan";
    if (a.Contains("sejong")) return "Sejong";
    if (a.Contains("jeju")) return "Jeju";
    if (a.Contains("gyeonggi")) return "Gyeonggi";
    if (a.Contains("gangwon")) return "Gangwon";
    if (a.Contains("chungbuk") || a.Contains("chungcheongbuk")) return "Chungbuk";
    if (a.Contains("chungnam") || a.Contains("chungcheongnam")) return "Chungnam";
    if (a.Contains("jeonbuk") || a.Contains("jeollabuk")) return "Jeonbuk";
    if (a.Contains("jeonnam") || a.Contains("jeollanam")) return "Jeonnam";
    if (a.Contains("gyeongbuk") || a.Contains("gyeongsangbuk")) return "Gyeongbuk";
    if (a.Contains("gyeongnam") || a.Contains("gyeongsangnam")) return "Gyeongnam";
    if (a.Contains("gwangju")) return "Gwangju";   // Jeonnam-Gwangju 통합 표기가 있어 뒤에 둔다

    // 번역이 안 된 한글 주소가 남는 경우 대비
    if (addr.Contains("서울")) return "Seoul";
    if (addr.Contains("부산")) return "Busan";
    if (addr.Contains("인천")) return "Incheon";
    if (addr.Contains("대구")) return "Daegu";
    if (addr.Contains("대전")) return "Daejeon";
    if (addr.Contains("울산")) return "Ulsan";
    if (addr.Contains("세종")) return "Sejong";
    if (addr.Contains("제주")) return "Jeju";
    if (addr.Contains("경기")) return "Gyeonggi";
    if (addr.Contains("강원")) return "Gangwon";
    if (addr.Contains("충북") || addr.Contains("충청북")) return "Chungbuk";
    if (addr.Contains("충남") || addr.Contains("충청남")) return "Chungnam";
    if (addr.Contains("전북") || addr.Contains("전라북")) return "Jeonbuk";
    if (addr.Contains("전남") || addr.Contains("전라남")) return "Jeonnam";
    if (addr.Contains("경북") || addr.Contains("경상북")) return "Gyeongbuk";
    if (addr.Contains("경남") || addr.Contains("경상남")) return "Gyeongnam";
    if (addr.Contains("광주")) return "Gwangju";
    return "Korea";
}

static string? Nul(string? s) => string.IsNullOrWhiteSpace(s) ? null : s.Trim();

static string FindRepoRoot()
{
    var dir = Directory.GetCurrentDirectory();
    while (dir != null && !File.Exists(Path.Combine(dir, "docker-compose.yml")))
        dir = Path.GetDirectoryName(dir);
    return dir ?? Directory.GetCurrentDirectory();
}

record Rec(string Lang, string Id, JsonElement L, JsonElement Cm, JsonElement In, JsonElement Im)
{
    public string? S(string n) => Get(L, n);
    public string? C(string n) => Get(Cm, n);
    public string? I(string n) => Get(In, n);

    // 갤러리: originimgurl 상위 n장 (firstimage 중복 제외는 웹에서)
    public string[] Images(int max) =>
        Im.ValueKind != JsonValueKind.Array ? [] :
        Im.EnumerateArray()
          .Select(x => x.TryGetProperty("originimgurl", out var u) && u.ValueKind == JsonValueKind.String ? u.GetString() : null)
          .Where(u => !string.IsNullOrWhiteSpace(u))
          .Distinct()
          .Take(max)
          .ToArray()!;
    static string? Get(JsonElement e, string n) =>
        e.TryGetProperty(n, out var v) && v.ValueKind == JsonValueKind.String &&
        !string.IsNullOrWhiteSpace(v.GetString()) ? v.GetString()!.Trim() : null;
}
