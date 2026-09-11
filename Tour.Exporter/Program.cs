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

// ── 매칭: 영문 제목 괄호 안 한글원제 → 국문 제목.
// 좌표(소수4자리)만으로 묶으면 같은 공연장의 별개 행사가 하나로 합쳐져 국문 축제가 조용히
// 사라진다(크리스마스 빌리지가 Busan Food Film Festa 로 묶이던 버그). 그래서 좌표는 단독으로
// 쓰지 않고, ①제목 정확일치 ②좌표 일치 AND 제목 포함관계 ③원제가 아예 없을 때만 좌표 단독,
// 순으로 좁혀 간다.
string NoSp(string s) => s.Replace(" ", "");
var reOrd = new Regex(@"제?\s*\d+\s*[회차]");
var reYear = new Regex(@"(?<![0-9])(19|20)\d{2}\s*년?");
bool IsHangul(char c) => c >= 0xAC00 && c <= 0xD7A3;
// 같은 축제인데 표기만 다른 경우가 많다 — "2026 " 접두사, "제18회", 〈꺾쇠〉, 한자 병기 (味),
// 작은따옴표. 연도·회차를 떼고 한글/영숫자만 남겨서 비교한다.
string TitleKey(string t)
{
    var s = reYear.Replace(reOrd.Replace(t, " "), " ");
    return string.Concat(s.Where(c => IsHangul(c) || char.IsAsciiLetterOrDigit(c))).ToLowerInvariant();
}
// 영문 제목에 붙는 한글 원제를 뽑는다. 형태가 제각각이라 후보를 여러 개 만들어 차례로 맞춰본다.
//   "... (광안리 M(Marvelous) 드론 라이트쇼)"       ← 원제 안에 또 괄호가 있다
//   "... (Jemulpo Wave Market) (인천 로컬 페스타)"  ← 영문 괄호가 앞에 먼저 나온다
IEnumerable<string> KorKeys(string t)
{
    var idx = t.IndexOf('(');
    if (idx >= 0)
    {
        var whole = t[idx..];
        if (whole.Any(IsHangul)) yield return TitleKey(whole);
    }
    var ms = Regex.Matches(t, @"[(]([^()]*)[)]?");
    for (var i = ms.Count - 1; i >= 0; i--)
    {
        var inner = ms[i].Groups[1].Value;
        if (inner.Any(IsHangul)) yield return TitleKey(inner);
    }
}
// 연도·회차를 떼고 제목을 맞추므로 "제8회(2025)" 와 "제9회(2026)" 가 같은 키가 된다.
// 시작일이 60일 넘게 벌어지면 다른 회차로 보고 묶지 않는다 — 안 그러면 올해 축제가
// 작년 영문 레코드에 흡수돼 사이트에서 사라진다.
bool SameEdition(Rec a, Rec b)
{
    const string F = "yyyyMMdd";
    var sa = a.S("eventstartdate"); var sb = b.S("eventstartdate");
    if (sa == null || sb == null) return true;
    var st = System.Globalization.DateTimeStyles.None;
    if (!DateTime.TryParseExact(sa, F, null, st, out var da)) return true;
    if (!DateTime.TryParseExact(sb, F, null, st, out var db)) return true;
    return Math.Abs((da - db).TotalDays) <= 60;
}
string? CoordKey(Rec r)
{
    var x = r.S("mapx"); var y = r.S("mapy");
    if (x == null || y == null) return null;
    return decimal.Round(decimal.Parse(x), 4) + "," + decimal.Round(decimal.Parse(y), 4);
}

var korByTitle = kor.GroupBy(k => TitleKey(k.S("title") ?? "")).ToDictionary(g => g.Key, g => g.ToList());
var korAtCoord = kor.Where(k => CoordKey(k) != null)
                    .GroupBy(k => CoordKey(k)!)
                    .ToDictionary(g => g.Key, g => g.ToList());
var matchedKor = new HashSet<string>();
int mTitle = 0, mNear = 0, mCoord = 0, mUnmatched = 0;
foreach (var e in eng)
{
    var keys = KorKeys(e.S("title") ?? "").Where(k => k.Length >= 4).ToList();
    Rec? hit = null;
    foreach (var k in keys)
        if (korByTitle.TryGetValue(k, out var list))
        {
            hit = list.FirstOrDefault(c => SameEdition(e, c));
            if (hit != null) break;
        }
    if (hit != null) { matchedKor.Add(hit.Id); mTitle++; continue; }

    var ck = CoordKey(e);
    if (ck != null && korAtCoord.TryGetValue(ck, out var cands))
    {
        // 같은 장소 AND 제목 포함관계 — 둘 다 요구해야 별개 행사를 안 묶는다.
        foreach (var k in keys)
        {
            hit = cands.FirstOrDefault(c =>
            {
                var kk = TitleKey(c.S("title") ?? "");
                return kk.Length >= 4 && SameEdition(e, c) && (kk.Contains(k) || k.Contains(kk));
            });
            if (hit != null) break;
        }
        if (hit != null) { matchedKor.Add(hit.Id); mNear++; continue; }
        // 한글 원제가 아예 없는 영문 레코드는 좌표 말고 기댈 게 없다.
        if (keys.Count == 0)
        {
            var only = cands.FirstOrDefault(c => SameEdition(e, c));
            if (only != null) { matchedKor.Add(only.Id); mCoord++; continue; }
        }
    }
    mUnmatched++;
}
Console.WriteLine($"kor-eng 매칭        제목 {mTitle:N0} · 좌표+포함 {mNear:N0} · 좌표단독 {mCoord:N0} · 미매칭 {mUnmatched:N0}");


// ── 커밋된 번역 로드
// data/translations/*.json 전부 병합 (배치 단위 커밋 가능, 뒤 파일이 앞을 덮음)
var trDir = Path.Combine(root, "data", "translations");
var translations = new Dictionary<string, Dictionary<string, string?>>();
if (Directory.Exists(trDir))
    foreach (var file in Directory.GetFiles(trDir, "*.json").OrderBy(x => x))
        foreach (var kv in JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string?>>>(File.ReadAllText(file))!)
            translations[kv.Key] = kv.Value;

// ── 병합 출력
// 검색 인덱스 행 — 축제·관광지·문화를 한 곳에 모은다. k=종류, t=제목, u=경로, r=지역.
var searchRows = new List<object>();
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

// ── 문화정보(국악·전통공연·전시) ────────────────────────────
// db/culture.json (Collector culture 명령) → web/data/culture.json.
// 축제와 같은 번역 전략: 원문은 한국어이므로 data/translations/culture-*.json 을 얹는다.
{
    var cultPath = Path.Combine(root, "db", "culture.json");
    if (File.Exists(cultPath))
    {
        var raw = JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string>>>(
            File.ReadAllText(cultPath))!;

        // 문화정보 전용 번역 병합 (culture- 로 시작하는 파일만)
        var cTr = new Dictionary<string, Dictionary<string, string?>>();
        if (Directory.Exists(trDir))
            foreach (var f in Directory.GetFiles(trDir, "culture-*.json").OrderBy(x => x))
                foreach (var kv in JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string?>>>(File.ReadAllText(f))!)
                    cTr[kv.Key] = kv.Value;

        var TRAD = new Regex("국악|판소리|사물놀이|풍물|가야금|거문고|해금|전통무용|살풀이|탈춤|무형유산|종묘|정악|산조|민요|아리랑|시조|창극");
        var cult = new List<Dictionary<string, object?>>();
        var cQueue = new List<Dictionary<string, object?>>();
        var cToday = DateTime.UtcNow.AddHours(9).ToString("yyyyMMdd");

        foreach (var (seq, it) in raw.OrderBy(kv => kv.Value.GetValueOrDefault("startDate", "")))
        {
            var title = it.GetValueOrDefault("title", "").Trim();
            if (title.Length == 0) continue;
            var realm = it.GetValueOrDefault("realmName", "");
            var end = it.GetValueOrDefault("endDate", "");
            if (string.Compare(end, cToday, StringComparison.Ordinal) < 0) continue;

            var isTrad = realm.Contains("국악") || TRAD.IsMatch(title);
            var isExh = realm.Contains("전시");
            if (!isTrad && !isExh) continue;   // 이번 범위는 전통공연·전시만

            cTr.TryGetValue(seq, out var tr);
            var enTitle = tr?.GetValueOrDefault("title") ?? Decode(title) ?? title;

            cult.Add(new Dictionary<string, object?>
            {
                ["id"] = seq,
                ["slug"] = Slug(enTitle) + "-" + seq,
                ["title"] = enTitle,
                ["start"] = it.GetValueOrDefault("startDate"),
                ["end"] = end,
                ["venue"] = tr?.GetValueOrDefault("venue") ?? Decode(it.GetValueOrDefault("place")),
                ["region"] = CultureRegion(it.GetValueOrDefault("area")),
                ["district"] = EnDistrict(tr?.GetValueOrDefault("addr") ?? Decode(it.GetValueOrDefault("placeAddr"))),
                ["kind"] = isTrad ? "traditional" : "exhibition",
                ["image"] = Nul(it.GetValueOrDefault("thumbnail")) ?? Nul(it.GetValueOrDefault("imgUrl")),
                ["gpsX"] = Nul(it.GetValueOrDefault("gpsX")),
                ["gpsY"] = Nul(it.GetValueOrDefault("gpsY")),
                ["price"] = EnPrice(tr?.GetValueOrDefault("price") ?? Decode(it.GetValueOrDefault("price"))),
                ["addr"] = tr?.GetValueOrDefault("addr") ?? Decode(it.GetValueOrDefault("placeAddr")),
                ["tel"] = Nul(it.GetValueOrDefault("phone")),
                ["url"] = Href(it.GetValueOrDefault("url")),
                ["venueUrl"] = Href(it.GetValueOrDefault("placeUrl")),
                // 번역본에 overview 가 없으면 비운다 — 한국어 원문이 영어 사이트에 노출되면 안 된다
                ["overview"] = tr != null ? tr.GetValueOrDefault("overview") : Strip(Decode(it.GetValueOrDefault("contents1"))),
                ["mt"] = tr != null,
            });

            if (tr == null)
                cQueue.Add(new Dictionary<string, object?>
                {
                    ["id"] = seq,
                    ["kind"] = isTrad ? "traditional" : "exhibition",
                    ["start"] = it.GetValueOrDefault("startDate"),
                    ["title"] = Decode(title),
                    ["place"] = Decode(it.GetValueOrDefault("place")),
                    ["area"] = it.GetValueOrDefault("area"),
                    ["price"] = Decode(it.GetValueOrDefault("price")),
                    ["addr"] = Decode(it.GetValueOrDefault("placeAddr")),
                    ["overview"] = Strip(Decode(it.GetValueOrDefault("contents1"))),
                });
        }

        foreach (var x in cult)
            searchRows.Add(new {
                k = (string?)x["kind"] == "traditional" ? "performance" : "exhibition",
                t = x["title"], u = "/culture/" + x["slug"] + "/", r = x["region"],
                d = x["start"], e = x["end"],
            });

        File.WriteAllText(Path.Combine(webData, "culture.json"), JsonSerializer.Serialize(cult, jsonOpt));
        File.WriteAllText(Path.Combine(root, "data", "culture_queue.json"),
            JsonSerializer.Serialize(cQueue, new JsonSerializerOptions { WriteIndented = true, Encoder = jsonOpt.Encoder }));
        Console.WriteLine($"culture.json        {cult.Count:N0}건 (전통 {cult.Count(c => (string?)c["kind"] == "traditional"):N0} · 전시 {cult.Count(c => (string?)c["kind"] == "exhibition"):N0}) · 번역대기 {cQueue.Count:N0}");
    }
    else
    {
        File.WriteAllText(Path.Combine(webData, "culture.json"), "[]");
        Console.WriteLine("culture.json        (db/culture.json 없음 — 빈 배열)");
    }
}

// ── 관광지(Places) ──────────────────────────────────────────
// db/places.json (Collector places) → web/data/places.json.
// 영문 원문이라 번역 불필요. 대신 ①의료·법인 노이즈 제거 ②9개 카테고리 분류
// ③지역코드 없는 항목의 주소 기반 보정이 핵심.
{
    var placePath = Path.Combine(root, "db", "places.json");
    if (File.Exists(placePath))
    {
        var raw = JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string>>>(
            File.ReadAllText(placePath))!;

        // 의료관광 등록업체가 '관광지'로 분류되어 들어온다 (279건) — 반드시 제외
        var MED = new Regex("clinic|hospital|medical|dermatolog|plastic surgery|dental|rhinoplasty|oriental medicine",
            RegexOptions.IgnoreCase);
        var BIZ = new Regex("\\bcompany\\b|\\bco\\.,? ?ltd|\\binc\\b|corporation", RegexOptions.IgnoreCase);
        // 쇼핑(79)에는 유니클로 지점·시몬스 매장처럼 여행 목적지가 아닌 체인 점포가 섞여 온다.
        var CHAIN = new Regex("uniqlo|simmons|memorium|rental shop|eyewear|optic|harmony mart", RegexOptions.IgnoreCase);

        var areaMap = new Dictionary<string, string>
        {
            ["1"] = "Seoul", ["2"] = "Incheon", ["3"] = "Daejeon", ["4"] = "Daegu", ["5"] = "Gwangju",
            ["6"] = "Busan", ["7"] = "Ulsan", ["8"] = "Sejong", ["31"] = "Gyeonggi", ["32"] = "Gangwon",
            ["33"] = "Chungbuk", ["34"] = "Chungnam", ["35"] = "Gyeongbuk", ["36"] = "Gyeongnam",
            ["37"] = "Jeonbuk", ["38"] = "Jeonnam", ["39"] = "Jeju",
        };

        var places = new List<Dictionary<string, object?>>();
        foreach (var (id, it) in raw)
        {
            var title = Decode(it.GetValueOrDefault("title")) ?? "";
            if (title.Length == 0) continue;
            if (MED.IsMatch(title) || BIZ.IsMatch(title) || CHAIN.IsMatch(title)) continue;

            var img = Nul(it.GetValueOrDefault("firstimage")) ?? Nul(it.GetValueOrDefault("firstimage2"));
            if (img == null) continue;   // 카드 UI 기준 — 사진 없으면 제외

            var addr = Decode(it.GetValueOrDefault("addr1"));
            var region = areaMap.TryGetValue(it.GetValueOrDefault("areacode") ?? "", out var rg)
                ? rg : RegionFromAddr(addr);
            if (region == "Korea") continue;   // 지역 판별 불가면 제외 (지역 허브에 못 넣음)

            places.Add(new Dictionary<string, object?>
            {
                ["id"] = id,
                ["slug"] = Slug(title) + "-" + id,
                ["title"] = title,
                ["cat"] = PlaceCategory(it.GetValueOrDefault("cat3"), it.GetValueOrDefault("cat2"), title, it.GetValueOrDefault("_ctype")),
                ["region"] = region,
                ["addr"] = addr,
                ["image"] = img,
                ["mapx"] = Nul(it.GetValueOrDefault("mapx")),
                ["mapy"] = Nul(it.GetValueOrDefault("mapy")),
                ["tel"] = Nul(it.GetValueOrDefault("tel")),
                // KTO 영문 데이터에 한국어 원문이 섞여 오는 항목이 있다 — 영어 사이트에 노출하지 않는다.
                ["overview"] = NoKorean(Strip(Decode(it.GetValueOrDefault("overview")))),
                // detailIntro2 — 콘텐츠 타입마다 필드명이 다르다(i_ 접두사로 저장돼 있다).
                ["hours"] = IntroField(it, "usetime", "opentimefood", "opentime", "usetimeculture"),
                ["closed"] = IntroField(it, "restdate", "restdatefood", "restdateshopping", "restdateculture"),
                ["fee"] = IntroField(it, "usefee", "usefeeculture"),
                ["menu"] = IntroField(it, "firstmenu", "treatmenu"),
                ["parking"] = IntroField(it, "parking", "parkingfood", "parkingshopping", "parkingculture"),
            });
        }

        places.Sort((a, b) => string.CompareOrdinal((string?)a["title"], (string?)b["title"]));
        File.WriteAllText(Path.Combine(webData, "places.json"), JsonSerializer.Serialize(places, jsonOpt));

        foreach (var x in places)
            searchRows.Add(new {
                k = "place", t = x["title"], u = "/place/" + x["slug"] + "/", r = x["region"],
                d = (string?)null, e = (string?)null,
            });

        var byCat = places.GroupBy(x => (string?)x["cat"]).OrderByDescending(g => g.Count())
            .Select(g => g.Key + " " + g.Count());
        Console.WriteLine($"places.json         {places.Count:N0}건");
        Console.WriteLine("  분류: " + string.Join(" · ", byCat));
    }
    else
    {
        File.WriteAllText(Path.Combine(webData, "places.json"), "[]");
        Console.WriteLine("places.json         (db/places.json 없음 — 빈 배열)");
    }
}

// 검색 인덱스 (헤더 검색박스용 슬림, ~40KB)
var pubDir = Path.Combine(root, "web", "public");
Directory.CreateDirectory(pubDir);
// 통합 검색 인덱스 — 축제만 담던 것을 관광지·문화·공연까지 넓혔다.
// 예전엔 "Gwangjang Market" 을 쳐도 결과가 없었다(관광지 2,387곳이 인덱스 밖).
foreach (var x in fests)
    searchRows.Add(new { k = "festival", t = x["title"], u = "/festival/" + x["slug"] + "/", r = x["region"], d = x["start"], e = x["end"] });
File.WriteAllText(Path.Combine(pubDir, "search-index.json"), JsonSerializer.Serialize(searchRows, jsonOpt));

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

// KTO cat3(소분류) → 여행자가 쓰는 말로 재편한 9개 카테고리.
// cat3 가 비어 오는 항목이 397건 있고 거기에 하회마을·BIFF광장 같은 알짜가 섞여 있어,
// 코드가 없으면 제목 키워드로 판정한다 (버리지 않는다).
static string PlaceCategory(string? cat3, string? cat2, string title, string? ctype = null)
{
    var c = cat3 ?? "";

    // 쇼핑(79)·음식점(82)은 콘텐츠 타입이 곧 분류다 — cat3 가 절반만 채워져 오기 때문.
    if (ctype == "82") return "food";
    if (ctype == "79")
    {
        // 한국민속촌처럼 쇼핑으로 등록됐지만 실제로는 민속마을인 것이 섞여 있다.
        if (Regex.IsMatch(title, "folk village|민속촌", RegexOptions.IgnoreCase)) return "villages";
        return Regex.IsMatch(title, "market|시장|활어|수산|fish center", RegexOptions.IgnoreCase)
            ? "markets" : "shopping";
    }

    // 박물관·미술관은 어느 코드로 들어오든 먼저 잡는다 (220건이 여러 분류에 흩어져 있었다).
    // "Museum Park"(테마파크) 처럼 이름만 박물관인 것은 제외.
    if (Regex.IsMatch(title, "museum|gallery|art (center|centre|hall|museum)|memorial hall|exhibition hall", RegexOptions.IgnoreCase)
        && !Regex.IsMatch(title, "museum park|alive museum|trick ?eye", RegexOptions.IgnoreCase))
        return "museums";
    // 궁궐·성곽·유적
    if (c is "A02010100" or "A02010200" or "A02010300" or "A02010700" or "A02011000") return "heritage";
    if (c is "A02010800") return "temples";                       // 사찰
    if (c is "A02010400" or "A02010500" or "A02010600" or "A02030100") return "villages";  // 고택·민속마을
    if (c is "A01010400" or "A01010200") return "hiking";         // 산·고개
    if (c is "A01011200" or "A01011300" or "A01011400" or "A01011100") return "coast";     // 해변·섬·항구
    if (c is "A01010600" or "A01010700" or "A01010900" or "A01011700" or "A01010500" or "A01010800" or "A01011800") return "nature";
    if (c is "A02050600" or "A02020800") return "views";          // 전망대
    if (c is "A02030400" or "A02030600" or "A02040800" or "A02040600") return "neighbourhoods";
    if (c is "A02020200" or "A02020300" or "A02020600" or "A02020700") return "themeparks";

    // cat2 로 한 번 더
    if (cat2 == "A0201") return "heritage";
    if (cat2 == "A0101") return "nature";
    if (cat2 == "A0202") return "themeparks";
    if (cat2 == "A0203") return "neighbourhoods";
    if (cat2 == "A0205") return "views";

    // 코드가 없으면 제목으로 판정.
    // ⚠ 단어 경계 필수 — "e-Sports"의 port 가 해변으로, "Geopark"의 park 가
    //   테마파크로 잡히던 오분류를 막는다.
    var t = title.ToLowerInvariant();
    bool W(string pattern) => Regex.IsMatch(t, "(?<![a-z])(?:" + pattern + ")(?![a-z])");

    // 자연 지형이 먼저 — Geopark·National Park 는 테마파크가 아니다
    if (W("geopark|national park|provincial park|falls|waterfall|valley|gorge|forest|arboretum|wetland|lake|reservoir|spring|cave|river")
        || Regex.IsMatch(t, "폭포|계곡|숲|수목원|호수|동굴|습지")) return "nature";
    if (W("temples?|hermitage") || t.Contains("사찰")) return "temples";
    if (W("palaces?|fortress(es)?|tombs?|shrines?|ruins?|historic site")
        || Regex.IsMatch(t, "궁궐|성곽|산성|고분|유적")) return "heritage";
    if (W("hanok|folk village|traditional village|historic village")
        || Regex.IsMatch(t, "민속마을|한옥마을")) return "villages";
    if (W("mountains?|peaks?|trails?|hiking|ridge|summit|pass")
        || Regex.IsMatch(t, "등산|둘레길")) return "hiking";
    if (W("beach(es)?|islands?|ports?|harbou?r|coast|cape|seaside")
        || Regex.IsMatch(t, "해수욕장|해변|해안")) return "coast";
    if (W("observator(y|ies)|skywalks?|cable cars?|towers?|viewpoints?|lookout|deck")
        || Regex.IsMatch(t, "전망대|스카이워크|케이블카")) return "views";
    if (W("markets?|streets?|alleys?|villages?|districts?|square|neighbou?rhood")
        || Regex.IsMatch(t, "시장|거리|골목")) return "neighbourhoods";
    if (W("theme parks?|amusement parks?|water ?parks?|resorts?|spas?|hot springs?|farms?|ranch|zoo|aquarium")
        || Regex.IsMatch(t, "온천|농장|목장|워터파크|테마파크")) return "themeparks";
    if (W("parks?|gardens?")) return "nature";   // 남은 일반 'park' 는 공원 = 자연 쪽

    return "neighbourhoods";   // 최후 기본값 — 도시 명소가 대부분
}

static string Slug(string s)
{
    var slug = Regex.Replace(s.ToLowerInvariant(), "[^a-z0-9]+", "-").Trim('-');
    return slug.Length > 60 ? slug[..60].Trim('-') : (slug.Length == 0 ? "festival" : slug);
}

// 요금도 한국어로 온다("전석 2만원"). 번역본에 price 가 없으면 여기로 떨어지는데,
// 한글을 그대로 내보내느니 기계적으로 옮긴다. 끝까지 한글이 남으면 비운다.
static string? EnPrice(string? raw)
{
    if (raw == null) return null;
    var s = Regex.Replace(raw.Trim(), @"\s+", " ");
    bool HasKo(string x) => x.Any(c => c >= 0xAC00 && c <= 0xD7A3);
    if (!HasKo(s)) return Nul(s);

    if (Regex.IsMatch(s, "^(전석 ?)?(무료입장|무료)$")) return "Free";
    if (s == "전석초대") return "Invitation only";
    if (s == "미정") return "To be announced";

    // "2만원" → "20,000 won" 을 먼저 풀고 나머지 낱말을 옮긴다
    var t = Regex.Replace(s, @"(\d+)만원",
        m => (int.Parse(m.Groups[1].Value) * 10000).ToString("N0") + " won");
    t = t.Replace("원", " won");
    // "전석 20,000 won" 은 영어 어순으로 뒤집는다
    var allSeats = Regex.Match(t, @"^전석 ?([\d,]+ won)(.*)$");
    if (allSeats.Success) t = allSeats.Groups[1].Value + ", all seats" + allSeats.Groups[2].Value;
    t = t.Replace("전석", "all seats").Replace("성인", "adults").Replace("일반", "adults")
         .Replace("청소년", "youth").Replace("어린이", "children").Replace("학생", "students")
         .Replace("석", " seats").Replace("무료", "free").Replace("할인", "discount");
    t = Regex.Replace(t, @"\s+", " ").Trim();
    return HasKo(t) ? null : Nul(t);
}

// sigungu 도 한국어로 온다("부여군"). 번역된 영문 주소에 이미 "Buyeo-gun" 이 들어 있으므로
// 거기서 구/군/시를 집어 쓴다. 못 찾으면 비운다 — 한글을 그대로 내보내느니 없는 편이 낫다.
static string? EnDistrict(string? addr)
{
    if (addr == null || addr.Any(c => c >= 0xAC00 && c <= 0xD7A3)) return null;
    var parts = addr.Split(',').Select(p => p.Trim());
    return parts.LastOrDefault(p => Regex.IsMatch(p, "-(gu|gun|si)$", RegexOptions.IgnoreCase));
}

// 문화정보 API 의 area 는 한국어다("서울","경기"). 축제·관광지는 영문 지역명을 쓰므로
// 그대로 두면 지역 페이지의 c.region === "Seoul" 비교가 영원히 빗나가
// 전통공연·전시 340건이 17개 지역 페이지 전부에서 사라진다.
static string CultureRegion(string? area) => (area ?? "").Trim() switch
{
    "서울" => "Seoul",   "부산" => "Busan",   "대구" => "Daegu",
    "인천" => "Incheon", "광주" => "Gwangju", "대전" => "Daejeon",
    "울산" => "Ulsan",   "세종" => "Sejong",  "경기" => "Gyeonggi",
    "강원" => "Gangwon", "충북" => "Chungbuk", "충남" => "Chungnam",
    "전북" => "Jeonbuk", "전남" => "Jeonnam",  "경북" => "Gyeongbuk",
    "경남" => "Gyeongnam", "제주" => "Jeju",
    // 전남·광주 통합특별시 — 주소 기준으로는 광주권으로 들어온다
    "전남광주통합" => "Gwangju",
    var s => s.Length > 0 && !s.Any(c => c >= 0xAC00 && c <= 0xD7A3) ? s : "Korea",
};

// detailIntro2 의 필드명은 콘텐츠 타입마다 다르다 — 관광지 usetime, 음식점 opentimefood,
// 쇼핑 opentime … 이름만 다르고 뜻은 같으니 순서대로 찾아 처음 채워진 것을 쓴다.
// 수집기가 i_ 접두사를 붙여 저장한다.
static string? IntroField(Dictionary<string, string> it, params string[] names)
{
    foreach (var n in names)
        if (it.TryGetValue("i_" + n, out var v))
        {
            var s = NoKorean(Strip(Decode(v)));
            // "0" 은 데이터 없음을 뜻하는 자리표시자다
            if (s != null && s != "0") return s;
        }
    return null;
}

// 한국어가 섞인 소개문은 버린다. KTO 영문 서비스에도 원문이 그대로 실려 오는 항목이 있는데,
// 영어권 방문자에게는 읽히지 않는 글자라 없느니만 못하다. 한글이 30자를 넘으면 통째로 비운다.
static string? NoKorean(string? text)
{
    if (text == null) return null;
    var hangul = text.Count(c => c >= 0xAC00 && c <= 0xD7A3);
    return hangul > 30 ? null : text;
}

static string? Strip(string? html)
{
    if (html == null) return null;
    // KTO 원문엔 <PARASITE>(영화 제목)·<Credit: Visit Jeju>(출처) 처럼 꺾쇠가 섞여 온다.
    // 실제 HTML 태그 이름만 제거하고 나머지는 살린다.
    const string names = "br|p|div|span|a|b|i|em|strong|u|ul|ol|li|table|tr|td|th|tbody|thead|img|font"
        + "|h1|h2|h3|h4|h5|h6|sup|sub|small|big|hr|center|blockquote|pre|code|figure|figcaption"
        + "|section|article|nav|header|footer|main|dl|dt|dd|caption|colgroup|col|s|strike|mark|wbr";
    // HTML 주석(<!-- wp:paragraph -->)과 스타일 속성이 붙은 태그도 제거한다
    var s = Regex.Replace(html, @"<!--[\s\S]*?-->", " ");
    s = Regex.Replace(s, "<br[^>]*>", " · ", RegexOptions.IgnoreCase);
    s = Regex.Replace(s, @"<!--[\s\S]*?-->", " ");
    s = Regex.Replace(s, "</?(?:" + names + ")(?=[ />])[^>]*>", " ", RegexOptions.IgnoreCase);
    s = Regex.Replace(s, "</?(?:" + names + ")>", " ", RegexOptions.IgnoreCase);
    return Nul(Regex.Replace(s, " {2,}", " "));
}

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

// KTO·문화정보 원문에 HTML 엔티티가 이중 인코딩되어 온다 (&amp;lt; → &lt; → <).
// 안정될 때까지 반복 디코딩한 뒤 남은 제어문자를 정리한다.
static string? Decode(string? s)
{
    if (s == null) return null;
    var cur = s;
    for (var i = 0; i < 3; i++)
    {
        var next = System.Net.WebUtility.HtmlDecode(cur);
        if (next == cur) break;
        cur = next;
    }
    return Nul(cur.Replace("\u00a0", " "));
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
