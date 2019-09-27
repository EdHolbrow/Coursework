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
                System.out.println(HighScoreID + " " + PlayerName + " " + Difficulty + " " + PositionOnBoard + " " + Score + " " + UserID);
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
        } catch (Exception exception) {
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

    public static void insertDatabase(int HighScoreID, String PlayerName, String Difficulty, int Score, int UserID) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PlayerName = ?, Difficulty = ?, Score = ?, UserID = ?) WHERE HighScoreID = ?");

            ps.setString(2, PlayerName);
            ps.setString(3, Difficulty);

            ps.setInt(5, Score);
            ps.setInt(6, UserID);
            ps.executeUpdate();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }


    public static void updateDatabase(int topPosition) {
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


    public static void updateScore(int Score, String PlayerName, String Difficulty, int UserID) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PlayerName = ?, Score = ?, UserID = ? WHERE PositionOnBoard = 10 AND Difficulty = ?");
            ps.setString(1, PlayerName);
            ps.setInt(2, Score);
            ps.setInt(3, UserID);
            ps.setString(4, Difficulty);


            ps.executeUpdate();
            updatePOB(Score, Difficulty);
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }

    public static void updatePOB(int Score, String Difficulty) {
        try {
            int POB = 11;
            boolean scoreFlag = false;
            while (scoreFlag == false) {
                POB = POB -1;
                if (isScoreLower(Score, Difficulty, POB) == true) {
                    PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET positionOnBoard = positionOnBoard + 1 WHERE PositionOnBoard = ? -1 AND Difficulty = ?");
                    ps.setInt(1, POB);
                    ps.setString(2, Difficulty);


                    ps.executeUpdate();
                } else {
                    scoreFlag = true;
                }
            }
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }


    public static boolean isScoreLower(int userscore, String userDifficulty, int POB) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT score FROM HighScores WHERE positionOnBoard =  ? - 1 AND Difficulty = ?");
            ps.setInt(1, POB);
            ps.setString(2, userDifficulty);
            ResultSet results = ps.executeQuery();

            while (results.next()) {

                int Score = results.getInt(5);
                if (Score >= userscore) {
                    return true;
                } else {
                    return false;
                }
            }


        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());

        }
        return false;
    }

}