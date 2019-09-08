import org.sqlite.SQLiteConfig;

import javax.jws.soap.SOAPBinding;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Scanner;

public class Main {

    public static Connection db = null;

    public static void main(String[] args) {

        //this opens the database
        openDatabase("CWDatabase1.db");
       HighscoreController.selectTopThree();

        //HighscoreController.selectDatabase();
        //HighscoreController.insertDatabase();
        // HighscoreController.updateDatabase(PlayerName, Difficulty, PositionOnBoard, score, UserID);
       // UserController.deleteDatabase(5);
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


}
