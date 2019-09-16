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
                int PositionOnBoard = results.getInt(4);
                int Score = results.getInt(5);
                int UserID = results.getInt(6);
                System.out.println(HighScoreID + " " + PlayerName + " " +Difficulty + " " +PositionOnBoard + " "+ Score + " " + UserID);
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
                    int PositionOnBoard = results.getInt(4);
                    int Score = results.getInt(5);
                    int UserID = results.getInt(6);
                    System.out.println(HighScoreID + " " + PlayerName + " " + Difficulty + " " + PositionOnBoard + " " + Score + " " + UserID);
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
                    int PositionOnBoard = results.getInt(4);
                    int Score = results.getInt(5);
                    int UserID = results.getInt(6);
                    System.out.println(HighScoreID + " " + PlayerName + " " + Difficulty + " " + PositionOnBoard + " " + Score + " " + UserID);
                }
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
    public static void insertDatabase(int HighScoreID, String PlayerName, String Difficulty, int PositionOnBoard, int Score, int UserID ) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PlayerName = ?, Difficulty = ?, PostitionOnBoard = ?, Score = ?, UserID = ?) WHERE HighScoreID = ?");

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


    public static void updateDatabase( int topPosition ) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PlayerName = ?, Difficulty = ?, Score = ?, UserID = ?) WHERE PositionOnBoard = ?");

//            ps.setString(2, PlayerName);
//            ps.setString(3, Difficulty);
//            ps.setInt(4, PositionOnBoard);
//            ps.setInt(5, Score);
//            ps.setInt(6, UserID);
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


    public static void findScoresBelow(int userscore, String userDifficulty) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM HighScores WHERE score >  userscore AND userDifficulty = Difficulty");
            ResultSet results = ps.executeQuery();
            int topPosition = 11;
            while (results.next()) {
                int HighScoreID = results.getInt(1);
                String PlayerName = results.getString(2);
                String Difficulty = results.getString(3);
                int PositionOnBoard = results.getInt(4);
                int Score = results.getInt(5);
                int UserID = results.getInt(6);
                if (PositionOnBoard < topPosition){
                    topPosition = PositionOnBoard;
                }
            }
            int startpoint = 9;
            selectToUpdate(topPosition, userDifficulty, startpoint);

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }

    public static void selectToUpdate (int topPosition, String userDifficulty, int startpoint) {
        try {

            while(startpoint < topPosition) {
                PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM HighScores WHERE PosistionOnBoard = startpoint AND userDifficulty = Difficulty");
                ResultSet results = ps.executeQuery();

                while (results.next()) {
                    int HighScoreID = results.getInt(1);
                    String PlayerName = results.getString(2);
                    String Difficulty = results.getString(3);
                    int PositionOnBoard = results.getInt(4);
                    int Score = results.getInt(5);
                    int UserID = results.getInt(6);
                    updateRowBelow(HighScoreID, PlayerName,Difficulty, PositionOnBoard, Score, UserID, userDifficulty, startpoint, topPosition );

                }

            }

        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }

    }

public static void updateRowBelow(int HighScoreID, String PlayerName, String Difficulty, int PositionOnBoard, int Score, int UserID, String userDifficulty, int startpoint, int topPosition){
    try {
        PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PlayerName = ?, Score = ?, UserID = ?) WHERE HighScoreID = (Startpoint - 1)");

        ps.setString(2, PlayerName);
        ps.setInt(5, Score);
        ps.setInt(6, UserID);
        ps.executeUpdate();
        startpoint = startpoint - 1;
        if (startpoint < topPosition) {
            selectToUpdate(topPosition, userDifficulty, startpoint);
        }else{
            insertDatabase(HighScoreID, PlayerName,Difficulty, PositionOnBoard, Score, UserID);
        }
    }catch (Exception exception) {
        System.out.println("Database error: " + exception.getMessage());
    }
}




    public static void updateDatabas(String PlayerName,String Difficulty, int PositionOnBoard, int Score, int UserID ) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PlayerName = ?, Difficulty = ?, Score = ?, UserID = ?) WHERE PositionOnBoard = ?");

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
}
