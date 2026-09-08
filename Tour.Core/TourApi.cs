using System.Text.Json;

namespace Tour.Core;

/// <summary>
/// TourAPI 4.0 GW 클라이언트. lang: 'kor' → KorService2 / 'eng' → EngService2.
/// 응답이 JSON 이 아니거나 resultCode != 0000 이면 예외 (쿼터 초과 시 XML 에러가 옴).
/// </summary>
public class TourApi(string keyEncoded, string lang)
{
    static readonly HttpClient Http = new() { Timeout = TimeSpan.FromSeconds(30) };

    string Base => lang == "kor"
        ? "https://apis.data.go.kr/B551011/KorService2"
        : "https://apis.data.go.kr/B551011/EngService2";

    public async Task<(JsonElement[] Items, int Total)> Get(string op, string extra, int page = 1, int rows = 100)
    {
        var url = $"{Base}/{op}?serviceKey={keyEncoded}&MobileOS=ETC&MobileApp=tour&_type=json" +
                  $"&numOfRows={rows}&pageNo={page}{extra}";
        var body = await Fetch(url);
        if (!body.TrimStart().StartsWith('{'))
            throw new ApplicationException($"API 비정상 응답(쿼터 초과 가능): {Head(body)}");

        using var doc = JsonDocument.Parse(body);
        var resp = doc.RootElement.GetProperty("response");
        var code = resp.GetProperty("header").GetProperty("resultCode").GetString();
        if (code != "0000")
            throw new ApplicationException($"API 오류 {code}: {Head(body)}");

        var b = resp.GetProperty("body");
        var totalEl = b.GetProperty("totalCount");
        var total = totalEl.ValueKind == JsonValueKind.Number ? totalEl.GetInt32() : int.Parse(totalEl.GetString()!);

        var items = Array.Empty<JsonElement>();
        if (b.TryGetProperty("items", out var it) && it.ValueKind == JsonValueKind.Object &&
            it.TryGetProperty("item", out var arr))
            items = arr.ValueKind == JsonValueKind.Array
                ? arr.EnumerateArray().Select(e => e.Clone()).ToArray()
                : [arr.Clone()];
        return (items, total);
    }

    // GW가 간헐적으로 30초를 넘기며 응답을 안 준다(새벽 배치가 통째로 죽은 원인).
    // 타임아웃·네트워크 오류만 재시도 — 쿼터 초과(XML 응답)는 재시도해도 소용없으므로 제외.
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
