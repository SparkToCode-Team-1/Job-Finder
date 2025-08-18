import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

public class ImportLogger {
    private static final String LOG_FILE = "import.log";

    public static void log(String message) {
        try (FileWriter fw = new FileWriter(LOG_FILE, true)) {
            fw.write(LocalDateTime.now() + " - " + message + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
