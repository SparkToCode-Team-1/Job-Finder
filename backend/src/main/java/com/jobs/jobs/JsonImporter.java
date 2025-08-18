import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;

public class JsonImporter {
    public static void importJson(String path) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Job[] jobs = mapper.readValue(new File(path), Job[].class);
            try (Connection conn = DatabaseUtil.getConnection()) {
                String insert = "INSERT INTO jobs (id, title, company, location, salary) VALUES (?, ?, ?, ?, ?)";
                for (Job job : jobs) {
                    try (PreparedStatement ps = conn.prepareStatement(insert)) {
                        ps.setInt(1, job.getId());
                        ps.setString(2, job.getTitle());
                        ps.setString(3, job.getCompany());
                        ps.setString(4, job.getLocation());
                        ps.setDouble(5, job.getSalary());
                        ps.executeUpdate();
                    }
                }
            }
            System.out.println("JSON import completed!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
