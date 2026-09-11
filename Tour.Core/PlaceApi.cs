using System.Text.Json;

namespace Tour.Core;

/// <summary>
/// KTO EngService2 areaBasedList2 — 영문 관광지/문화시설.
/// 축제(searchFestival2)와 같은 GW·같은 키를 쓰되 contentTypeId 가 다르다.
/// 영문 서비스의 콘텐츠 타입은 국문(12·39...)과 코드 체계가 다름: 76=관광지, 78=문화시설.
/// </summary>
public class PlaceApi(string keyEncoded)
{
    static readonly HttpClient Http = new() { Timeout = TimeSpan.FromSeconds(30) };
    const string Base = "https://apis.data.go.kr/B551011/EngService2";

    public async Task<(JsonElement[] Items, int Total)> AreaBased(int contentTypeId, int page, int rows = 1000)
    {
        var url = $"{Base}/areaBasedList2?serviceKey={keyEncoded}&MobileOS=ETC&MobileApp=tour&_type=json"
                + $"&numOfRows={rows}&pageNo={page}&contentTypeId={contentTypeId}&arrange=A";
        return Parse(await Fetch(url));
    }

    /// <summary>detailCommon2 — overview(소개문) 확보용</summary>
    public async Task<JsonElement?> Detail(string contentId)
    {
        var url = $"{Base}/detailCommon2?serviceKey={keyEncoded}&MobileOS=ETC&MobileApp=tour&_type=json"
                + $"&contentId={contentId}";
        var (items, _) = Parse(await Fetch(url));
        return items.Length > 0 ? items[0] : null;
    }

    /// <summary>
    /// detailIntro2 — 개관시간·휴관일·입장료. 여행자가 가장 먼저 묻는 "지금 열었나, 얼마인가"다.
    /// 필드명이 콘텐츠 타입마다 다르다: 관광지는 usetime/restdate/expguide,
    /// 음식점은 opentimefood/restdatefood/firstmenu, 쇼핑은 opentime/restdateshopping.
    /// </summary>
    public async Task<JsonElement?> Intro(string contentId, string contentTypeId)
    {
        var url = $"{Base}/detailIntro2?serviceKey={keyEncoded}&MobileOS=ETC&MobileApp=tour&_type=json"
                + $"&contentId={contentId}&contentTypeId={contentTypeId}";
        var (items, _) = Parse(await Fetch(url));
        return items.Length > 0 ? items[0] : null;
    }

    static (JsonElement[], int) Parse(string body)
    {
        if (!body.TrimStart().StartsWith('{'))
            throw new ApplicationException("API 비정상 응답(쿼터 초과 가능): " + Head(body));

        using var doc = JsonDocument.Parse(body);
        var resp = doc.RootElement.GetProperty("response");
        var code = resp.GetProperty("header").GetProperty("resultCode").GetString();
        if (code != "0000") throw new ApplicationException($"API 오류 {code}: {Head(body)}");

        var b = resp.GetProperty("body");
        var totalEl = b.GetProperty("totalCount");
        var total = totalEl.ValueKind == JsonValueKind.Number
            ? totalEl.GetInt32() : int.Parse(totalEl.GetString()!);

        var items = Array.Empty<JsonElement>();
        if (b.TryGetProperty("items", out var it) && it.ValueKind == JsonValueKind.Object &&
            it.TryGetProperty("item", out var arr))
            items = arr.ValueKind == JsonValueKind.Array
                ? arr.EnumerateArray().Select(e => e.Clone()).ToArray()
                : [arr.Clone()];
        return (items, total);
    }

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
