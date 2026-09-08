using Npgsql;

namespace Tour.Core;

public static class Db
{
    public static NpgsqlConnection Open(AppSettings cfg)
    {
        var conn = new NpgsqlConnection(cfg.Db);
        conn.Open();
        return conn;
    }
}
