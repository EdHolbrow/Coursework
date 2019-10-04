package Controllers;

import Server.Main;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class HighscoreController {
    @GET
    @Path("selectAll")
    @Produces(MediaType.APPLICATION_JSON)

    public String  selectAllScores() {
        System.out.println("/Highscores/selectAll");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM HighScores");
            ResultSet results = ps.executeQuery();
            while (results.next()) {

                JSONObject item = new JSONObject();
                item.put("HighscoreID", results.getInt(1));
                item.put("PlayerName", results.getString(2));
                item.put("Difficulty", results.getString(3));
                item.put("PositionOnBoard", results.getInt(4));
                item.put( "Score", results.getInt(5));
                item.put( "UserID", results.getInt(6));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";

        }
    }
    @GET
    @Path("selectDifficulty")
    @Produces(MediaType.APPLICATION_JSON)
    public String selectDifficulty(String difficultySelected) {
        System.out.println("/Highscores/selectDifficulty");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM HighScores WHERE Difficulty = ? ");
            ps.setString(1, difficultySelected);
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("HighscoreID", results.getInt(1));
                item.put("PlayerName", results.getString(2));
                item.put("Difficulty", results.getString(3));
                item.put("PositionOnBoard", results.getInt(4));
                item.put( "Score", results.getInt(5));
                item.put( "UserID", results.getInt(6));
                list.add(item);

            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
        }
    }
    @GET
    @Path("selectTopThree")
    @Produces(MediaType.APPLICATION_JSON)
    public String selectTopThree() {
        System.out.println("/Highscores/selectTopThree");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM HighScores WHERE PositionOnBoard < 4 ");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("HighscoreID", results.getInt(1));
                item.put("PlayerName", results.getString(2));
                item.put("Difficulty", results.getString(3));
                item.put("PositionOnBoard", results.getInt(4));
                item.put( "Score", results.getInt(5));
                item.put( "UserID", results.getInt(6));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
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






    @POST
    @Path("updateScores")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String  updateScore(@FormDataParam("PlayerName") String PlayerName, @FormDataParam("Score") Integer Score,@FormDataParam("Difficulty") String Difficulty,@FormDataParam("UserID") Integer UserID) {
            try {
                if (PlayerName == null || Score == null || Difficulty == null|| UserID == null) {
                    throw new Exception("One or more form data parameters are missing in the HTTP request.");
                }

            PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PlayerName = ?, Score = ?, UserID = ? WHERE PositionOnBoard = 10 AND Difficulty = ?");
            ps.setString(1, PlayerName);
            ps.setInt(2, Score);
            ps.setInt(3, UserID);
            ps.setString(4, Difficulty);


            ps.execute();
                return "{\"status\": \"OK\"}";


        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
                return "{\"error\": \"Unable to update item, please see server console for more info.\"}";
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