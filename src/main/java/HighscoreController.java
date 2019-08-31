import javafx.geometry.Pos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class HighscoreController {

    public static void selectDatabase() {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM HighScores");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                int HighScoreID = results.getInt(1);
                String PlayerName = results.getString(2);
                String Difficulty = results.getString(3);
                int PositionOnBoard = results.getInt(5);
                int score = results.getInt(5);
                int UserID = results.getInt(6);
                System.out.println(HighScoreID + " " + PlayerName + " " +Difficulty + " " +PositionOnBoard + " "+ score + " " + UserID);
            }
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void selectDifficulty(String difficultySelected) {
        try {

                PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM HighScores WHERE Difficulty = ? ");
                ps.setString(1, difficultySelected);
                ResultSet results = ps.executeQuery();

                while (results.next()) {
                    int HighScoreID = results.getInt(1);
                    String PlayerName = results.getString(2);
                    String Difficulty = results.getString(3);
                    int PositionOnBoard = results.getInt(5);
                    int score = results.getInt(5);
                    int UserID = results.getInt(6);
                    System.out.println(HighScoreID + " " + PlayerName + " " + Difficulty + " " + PositionOnBoard + " " + score + " " + UserID);
                }
            }
             catch(Exception exception){
                System.out.println("Database error: " + exception.getMessage());
            }

    }
    public static void selectTopThree() {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM HighScores WHERE PositionOnBoard < 4 ");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                    int HighScoreID = results.getInt(1);
                    String PlayerName = results.getString(2);
                    String Difficulty = results.getString(3);
                    int PositionOnBoard = results.getInt(5);
                    int score = results.getInt(5);
                    int UserID = results.getInt(6);
                    System.out.println(HighScoreID + " " + PlayerName + " " + Difficulty + " " + PositionOnBoard + " " + score + " " + UserID);
                }
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void insertDatabase(int HighScoreID, String PlayerName, String Difficulty, int PositionOnBoard, int Score, int UserID) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("INSERT INTO HighScores (HighScoreID, PlayerName, Difficulty, PositionOnBoard, Score, UserID) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, HighScoreID);
            ps.setString(2, PlayerName);
            ps.setString(3, Difficulty);
            ps.setInt(4, PositionOnBoard);
            ps.setInt(5, Score);
            ps.setInt(6, UserID);
            ps.executeUpdate();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void updateDatabase(String PlayerName,String Difficulty, int PositionOnBoard, int Score, int UserID ) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PlayerName = ?, Difficulty = ?, Score = ?, UserID = ?) WHERE PositionOnBoard = ?");

            ps.setString(2, PlayerName);
            ps.setString(3, Difficulty);
            ps.setInt(3, PositionOnBoard);
            ps.setInt(5, Score);
            ps.setInt(6, UserID);
            ps.executeUpdate();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void deleteDatabase(int HighScoreID) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("DELETE FROM HighScores WHERE HighScoreID = ?)");
            ps.setInt(1, HighScoreID);
            ps.executeUpdate();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
}
