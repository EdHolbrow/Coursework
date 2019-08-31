import org.sqlite.SQLiteConfig;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Scanner;

public class Main {

    public static Connection db = null;

    public static void main(String[] args) {

        //this opens the database
        openDatabase("CWDatabase1.db");
//
//        int HighScoreID, PositionOnBoard, score, UserID;
//        String PlayerName, Difficulty;
//        PositionOnBoard = 0;
//        PlayerName = "Greg";
//        UserID = 1;
//        Difficulty = "Easy";
//        Scanner sc = new Scanner(System.in);
UserController.selectAllUsers();
//        System.out.println("Enter Score");
//        score = sc.nextInt();
        //HighscoreController.selectDatabase();
        //HighscoreController.insertDatabase();
       // HighscoreController.updateDatabase(PlayerName, Difficulty, PositionOnBoard, score, UserID);
        //HighscoreController.deleteDatabase(5);
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
