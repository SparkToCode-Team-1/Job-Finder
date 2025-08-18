import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

public class AdminView {
    public static void showJobs() {
        try (Connection conn = DatabaseUtil.getConnection();
             Statement stmt = conn.createStatement()) {
            ResultSet rs = stmt.executeQuery("SELECT * FROM jobs");
            while (rs.next()) {
                System.out.printf("%d | %s | %s | %s | %.2f\n",
                        rs.getInt("id"),
                        rs.getString("title"),
                        rs.getString("company"),
                        rs.getString("location"),
                        rs.getDouble("salary"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
