import java.sql.*;

public class DatabaseUtil {
    private static final String JDBC_URL = "jdbc:h2:./jobsdb";
    private static final String USER = "sa";
    private static final String PASS = "";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(JDBC_URL, USER, PASS);
    }

    public static void createTable() throws SQLException {
        String sql = """
            CREATE TABLE IF NOT EXISTS jobs (
                id INT PRIMARY KEY,
                title VARCHAR(255),
                company VARCHAR(255),
                location VARCHAR(255),
                salary DOUBLE
            )
            """;
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        }
    }
}
