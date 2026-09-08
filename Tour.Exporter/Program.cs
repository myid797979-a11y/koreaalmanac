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

var all = conn.Query<(string Lang, string Id, string List, string Common, string Intro)>("""
    select lang, contentid, list_json::text, coalesce(common_json::text,'{}'), coalesce(intro_json::text,'{}')
    from raw_item where detailed_at is not null
    """).Select(r =>
{
    var l = JsonDocument.Parse(r.List).RootElement;
    var c = JsonDocument.Parse(r.Common).RootElement;
    var i = JsonDocument.Parse(r.Intro).RootElement;
    return new Rec(r.Lang, r.Id, l, c, i);
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

Console.WriteLine($"""
    festivals.json      {fests.Count:N0}건 (영문 {eng.Count:N0} + 번역 병합 {translated:N0})
    translation_queue   {queue.Count:N0}건 (active {queue.Count(q => (bool)q["active"]!):N0})
    """);

Dictionary<string, object?> Build(Rec r, Dictionary<string, string?>? tr)
{
    var titleRaw = tr?.GetValueOrDefault("title") ?? r.S("title") ?? "";
    var title = CleanTitle(titleRaw);
    return new()
    {
        ["id"] = r.Id,
        ["slug"] = Slug(title) + "-" + r.Id,
        ["title"] = title,
        ["titleFull"] = r.S("title"),
        ["start"] = r.S("eventstartdate"),
        ["end"] = r.S("eventenddate"),
        ["region"] = regions.GetValueOrDefault(r.S("lDongRegnCd") ?? "", "Korea"),
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
    };
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

static string? Href(string? html)
{
    if (html == null) return null;
    var m = Regex.Match(html, "href=\u0022([^\u0022]+)\u0022");
    return m.Success ? m.Groups[1].Value : Nul(Regex.Replace(html, "<[^>]+>", ""));
}

static string? Nul(string? s) => string.IsNullOrWhiteSpace(s) ? null : s.Trim();

static string FindRepoRoot()
{
    var dir = Directory.GetCurrentDirectory();
    while (dir != null && !File.Exists(Path.Combine(dir, "docker-compose.yml")))
        dir = Path.GetDirectoryName(dir);
    return dir ?? Directory.GetCurrentDirectory();
}

record Rec(string Lang, string Id, JsonElement L, JsonElement Cm, JsonElement In)
{
    public string? S(string n) => Get(L, n);
    public string? C(string n) => Get(Cm, n);
    public string? I(string n) => Get(In, n);
    static string? Get(JsonElement e, string n) =>
        e.TryGetProperty(n, out var v) && v.ValueKind == JsonValueKind.String &&
        !string.IsNullOrWhiteSpace(v.GetString()) ? v.GetString()!.Trim() : null;
}
