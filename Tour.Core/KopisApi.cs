using System.Text.RegularExpressions;

namespace Tour.Core;

/// <summary>
/// 공연예술통합전산망(KOPIS) Open API — 예술경영지원센터.
/// 예매처에서 집계한 공연 데이터라 KTO 축제와 성격이 다르다:
/// 콘서트·뮤지컬·클래식·연극이 예매 시점에 들어오고, 포스터·좌석별 가격·
/// 공연시간·출연진·공식 예매링크·공연장 좌표까지 준다.
///
/// ⚠ 이용약관: "KOPIS에 의거하여 개발된 서비스"임을 반드시 명시해야 하며,
///   미표기 시 서비스가 중단될 수 있다. 푸터 출처 표기는 필수다.
/// ⚠ 인증키는 1인당 1개만 발급되고 양도·공유 불가. 쿼리 한도가 명시돼 있지
///   않으므로(초과 시 중지) 보수적으로 쓴다 — 재발급이 어렵다.
/// </summary>
public class KopisApi(string key)
{
    static readonly HttpClient Http = new() { Timeout = TimeSpan.FromSeconds(30) };
    const string Base = "http://www.kopis.or.kr/openApi/restful";

    /// <summary>
    /// 공연목록. cate 는 장르코드 — CCCD 대중음악 · GGGA 뮤지컬 · CCCA 서양음악(클래식)
    /// · AAAA 연극 · CCCC 국악. null 이면 전체.
    /// 날짜는 yyyyMMdd. 한 페이지 최대 100건.
    /// </summary>
    public async Task<List<Dictionary<string, string>>> List(
        string from, string to, string? cate, int page, int rows = 100)
    {
        var url = $"{Base}/pblprfr?service={key}&stdate={from}&eddate={to}&cpage={page}&rows={rows}"
                + (cate is null ? "" : $"&shcate={cate}");
        return Parse(await Fetch(url));
    }

    /// <summary>공연 상세 — 좌석별 가격(pcseguidance)·공연시간(dtguidance)·출연(prfcast)·예매링크(relateurl)</summary>
    public async Task<Dictionary<string, string>?> Detail(string mt20id)
    {
        var items = Parse(await Fetch($"{Base}/pblprfr/{mt20id}?service={key}"));
        return items.Count > 0 ? items[0] : null;
    }

    /// <summary>공연시설 상세 — 좌표(la/lo)·주소·좌석수·주차·장애인 접근성</summary>
    public async Task<Dictionary<string, string>?> Venue(string mt10id)
    {
        var items = Parse(await Fetch($"{Base}/prfplc/{mt10id}?service={key}"));
        return items.Count > 0 ? items[0] : null;
    }

    /// <summary>
    /// 응답은 &lt;dbs&gt;&lt;db&gt;…&lt;/db&gt;&lt;/dbs&gt; 형태.
    /// 상세에는 &lt;relates&gt;&lt;relate&gt;… 처럼 중첩이 섞여 있어,
    /// 내용에 태그가 없는 잎 노드만 뽑는다(중첩 부모를 통째로 삼키면 안쪽이 통째로 날아간다).
    /// 같은 이름이 여러 번 나오면 첫 값을 쓴다 — 예매처가 여럿일 때 대표 하나면 충분하다.
    /// </summary>
    static List<Dictionary<string, string>> Parse(string xml)
    {
        if (xml.Contains("<returnAuthMsg>") || xml.Contains("SERVICE_KEY") || xml.Contains("<OpenAPI_ServiceResponse>"))
            throw new ApplicationException("KOPIS API 오류: " + Head(xml));

        var list = new List<Dictionary<string, string>>();
        foreach (Match blk in Regex.Matches(xml, @"<db>([\s\S]*?)</db>"))
        {
            var d = new Dictionary<string, string>();
            foreach (Match f in Regex.Matches(blk.Groups[1].Value, @"<([a-zA-Z][\w]*)>([^<]*)</\1>"))
            {
                var v = f.Groups[2].Value.Replace("<![CDATA[", "").Replace("]]>", "").Trim();
                if (v.Length > 0 && !d.ContainsKey(f.Groups[1].Value)) d[f.Groups[1].Value] = v;
            }
            if (d.Count > 0) list.Add(d);
        }
        return list;
    }

    // KTO·문화정보와 같은 재시도 정책 — 공공 GW 는 간헐적으로 무응답이다
    static async Task<string> Fetch(string url)
    {
        for (var attempt = 1; ; attempt++)
        {
            try { return await Http.GetStringAsync(url); }
            catch (Exception e) when (attempt <= 5 && e is TaskCanceledException or HttpRequestException)
            {
                Console.WriteLine($"  HTTP 재시도 {attempt}/5 ({e.GetType().Name})");
                await Task.Delay(TimeSpan.FromSeconds(attempt * 20));
            }
        }
    }

    static string Head(string s) => s.Length > 200 ? s[..200] : s;
}
