using System.Text.Json;

namespace Tour.Core;

/// <summary>appsettings.json + appsettings.local.json(키, gitignore) + 환경변수 오버레이.</summary>
public record AppSettings(string Db, string ApiKeyEncoded, string KopisKey)
{
    public static AppSettings Load()
    {
        var dict = new Dictionary<string, string>();
        foreach (var name in new[] { "appsettings.json", "appsettings.local.json" })
        {
            var path = Path.Combine(AppContext.BaseDirectory, name);
            if (!File.Exists(path)) continue;
            using var doc = JsonDocument.Parse(File.ReadAllText(path));
            foreach (var p in doc.RootElement.EnumerateObject())
                dict[p.Name] = p.Value.GetString() ?? "";
        }
        var db  = Environment.GetEnvironmentVariable("TOUR_DB")      ?? dict.GetValueOrDefault("Db", "");
        var key = Environment.GetEnvironmentVariable("TOUR_API_KEY") ?? dict.GetValueOrDefault("ApiKeyEncoded", "");
        // KOPIS 는 별도 기관(예술경영지원센터) 키라 TOUR_API_KEY 와 다르다.
        // 없다고 던지지 않는다 — 축제·관광지 수집은 이 키 없이도 돌아야 한다.
        var kopis = Environment.GetEnvironmentVariable("KOPIS_KEY") ?? dict.GetValueOrDefault("KopisKey", "");
        if (string.IsNullOrEmpty(key))
            throw new ApplicationException("API 키 없음 — appsettings.local.json 또는 TOUR_API_KEY 환경변수 필요");
        return new AppSettings(db, key, kopis);
    }
}
