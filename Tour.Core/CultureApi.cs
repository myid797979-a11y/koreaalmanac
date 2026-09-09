using System.Text.RegularExpressions;

namespace Tour.Core;

/// <summary>
/// 한국문화정보원 "한눈에보는문화정보" API (data.go.kr B553457/cultureinfo).
/// 응답이 XML 이고 필드가 평면적이라 정규식으로 뽑는다.
/// 개발계정 일 10,000콜 — 축제 API(1,000)보다 여유로워 매일 전량 재조회해도 된다.
/// </summary>
public class CultureApi(string keyEncoded)
{
    static readonly HttpClient Http = new() { Timeout = TimeSpan.FromSeconds(30) };
    const string Base = "https://apis.data.go.kr/B553457/cultureinfo";

    /// <summary>기간별 목록 — serviceTp: A(공연/전시) B(행사/축제) C(교육/체험)</summary>
    public async Task<(List<Dictionary<string, string>> Items, int Total)> Period(
        string serviceTp, string from, string to, int page, int rows = 1000)
    {
        var url = $"{Base}/period2?serviceKey={keyEncoded}&PageNo={page}&numOfrows={rows}"
                + $"&from={from}&to={to}&serviceTp={serviceTp}";
        return Parse(await Fetch(url));
    }

    /// <summary>상세 — 가격·연락처·예매 URL·공연장 주소</summary>
    public async Task<Dictionary<string, string>?> Detail(string seq)
    {
        var (items, _) = Parse(await Fetch($"{Base}/detail2?serviceKey={keyEncoded}&seq={seq}"));
        return items.Count > 0 ? items[0] : null;
    }

    static (List<Dictionary<string, string>>, int) Parse(string xml)
    {
        if (xml.Contains("<errMsg>") || xml.Contains("SERVICE_KEY"))
            throw new ApplicationException("문화정보 API 오류: " + Head(xml));

        var total = 0;
        var tm = Regex.Match(xml, "<totalCount>(\\d+)</totalCount>");
        if (tm.Success) total = int.Parse(tm.Groups[1].Value);

        var list = new List<Dictionary<string, string>>();
        foreach (Match blk in Regex.Matches(xml, "<item>([\\s\\S]*?)</item>"))
        {
            var d = new Dictionary<string, string>();
            foreach (Match f in Regex.Matches(blk.Groups[1].Value, "<([a-zA-Z][\\w]*)>([\\s\\S]*?)</\\1>"))
            {
                var v = f.Groups[2].Value.Replace("<![CDATA[", "").Replace("]]>", "").Trim();
                if (v.Length > 0) d[f.Groups[1].Value] = v;
            }
            if (d.ContainsKey("seq")) list.Add(d);
        }
        return (list, total);
    }

    // GW가 간헐적으로 무응답 — 축제 수집기와 같은 재시도 정책
    static async Task<string> Fetch(string url)
    {
        for (var attempt = 1; ; attempt++)
        {
            try { return await Http.GetStringAsync(url); }
            catch (Exception e) when (attempt <= 3 && e is TaskCanceledException or HttpRequestException)
            {
                Console.WriteLine($"  HTTP 재시도 {attempt}/3 ({e.GetType().Name})");
                await Task.Delay(TimeSpan.FromSeconds(attempt * 10));
            }
        }
    }

    static string Head(string s) => s.Length > 200 ? s[..200] : s;
}
