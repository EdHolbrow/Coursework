import org.sqlite.SQLiteConfig;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Main {

    public static Connection db = null;

    public static void main(String[] args) {
        //this opens the database
        openDatabase("CWDatabase1.db");

        selectDatabase();

        //this closes the database
        closeDatabase();
    }

    private static void openDatabase(String dbFile) {
        try {
            //loads the database driver
            Class.forName("org.sqlite.JDBC");
            SQLiteConfig config = new SQLiteConfig();
            config.enforceForeignKeys(true);
            //opens the database file
            db = DriverManager.getConnection("jdbc:sqlite:resources/" + dbFile, config.toProperties());
            System.out.println("Database connection successfully established.");
        } catch (Exception exception) {
            System.out.println("Database connection error: " + exception.getMessage());
        }

    }

    private static void closeDatabase() {
        try {
            db.close();
            System.out.println("Disconnected from database.");
        } catch (Exception exception) {
            System.out.println("Database disconnection error: " + exception.getMessage());
        }
    }


    public static void selectDatabase() {
        try {
            PreparedStatement ps = db.prepareStatement("SELECT HighScoreID, PlayerName, Difficulty, PositionOnBoard, Score FROM HighScores");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                int HighScoreID = results.getInt(1);
                String PlayerName = results.getString(2);
                String Difficulty = results.getString(3);
                int PositionOnBoard = results.getInt(5);
                int score = results.getInt(5);
                System.out.println(HighScoreID + " " + PlayerName + " " +Difficulty + " " +PositionOnBoard + " "+ score);
            }
       } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void insertDatabase() {
        try {
            PreparedStatement ps = db.prepareStatement("INSERT INTO HighScores (HighScoreID, PlayerName, Difficulty, PositionOnBoard, Score) VALUES (?, ?, ?, ?, ?)");
            ps.setInt(1, 5);
            ps.setString(2, "Bob");
            ps.setString(3, "Easy");
            ps.setInt(4, 5);
            ps.setInt(5, 500);
            ps.executeUpdate();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
}
