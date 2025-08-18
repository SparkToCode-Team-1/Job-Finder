import com.opencsv.CSVReader;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.PreparedStatement;

public class CsvImporter {
    public static void importCsv(String path) {
        try (CSVReader reader = new CSVReader(new FileReader(path));
             Connection conn = DatabaseUtil.getConnection()) {

            String insert = "INSERT INTO jobs (id, title, company, location, salary) VALUES (?, ?, ?, ?, ?)";
            String[] line;
            reader.readNext(); // skip header
            while ((line = reader.readNext()) != null) {
                try (PreparedStatement ps = conn.prepareStatement(insert)) {
                    ps.setInt(1, Integer.parseInt(line[0]));
                    ps.setString(2, line[1]);
                    ps.setString(3, line[2]);
                    ps.setString(4, line[3]);
                    ps.setDouble(5, Double.parseDouble(line[4]));
                    ps.executeUpdate();
                }
            }
            System.out.println("CSV import completed!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
