package Controllers;

import Server.Main;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("Highscores")
public class HighscoreController {

    @GET
    @Path("selectAll")
    @Produces(MediaType.APPLICATION_JSON)
    public String  selectAllScores() {
        System.out.println("Highscores/selectAll");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT PlayerName, Difficulty, PositionOnBoard, Score, UserID FROM HighScores");
            ResultSet results = ps.executeQuery();
            while (results.next()) {

                JSONObject item = new JSONObject();

                item.put("PlayerName", results.getString(1));
                item.put("Difficulty", results.getString(2));
                item.put("PositionOnBoard", results.getInt(3));
                item.put( "Score", results.getInt(4));
                item.put( "UserID", results.getInt(5));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";

        }
    }
    @POST
    @Path("selectDifficulty")
    @Produces(MediaType.APPLICATION_JSON)
    public String selectDifficulty(@FormDataParam("Difficulty") String difficultySelected) {
        System.out.println("/Highscores/selectDifficulty");
        JSONArray list = new JSONArray();
        try {
            if (difficultySelected == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            PreparedStatement ps = Main.db.prepareStatement("SELECT PlayerName, Difficulty, PositionOnBoard, Score, UserID FROM HighScores WHERE Difficulty = ? ORDER BY PositionOnBoard");
            ps.setString(1, difficultySelected);
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("PlayerName", results.getString(1));
                item.put("Difficulty", results.getString(2));
                item.put("PositionOnBoard", results.getInt(3));
                item.put( "Score", results.getInt(4));
                item.put( "UserID", results.getInt(5));
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
            PreparedStatement ps = Main.db.prepareStatement("SELECT PlayerName, Difficulty, PositionOnBoard, Score, UserID FROM HighScores WHERE PositionOnBoard < 4 ");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();

                item.put("PlayerName", results.getString(1));
                item.put("Difficulty", results.getString(2));
                item.put("PositionOnBoard", results.getInt(3));
                item.put( "Score", results.getInt(4));
                item.put( "UserID", results.getInt(5));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("updateScores")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String  updateScore(@FormDataParam("Name") String PlayerName,@FormDataParam("Difficulty") String Difficulty, @FormDataParam("Score") Integer Score,@FormDataParam("UserID") Integer UserID) {
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
            ClearPoB(Difficulty);
                return "{\"status\": \"OK\"}";
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
                return "{\"error\": \"Unable to update item, please see server console for more info.\"}";
            }
    }

    public static void ClearPoB(String difficultySelected) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PositionOnBoard = 1 WHERE Difficulty = ?");
            ps.setString(1, difficultySelected);
            ps.executeUpdate();
            System.out.println("Update successful");
            updatePOB(difficultySelected);
        }  catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }

    public static void updatePOB(String Difficulty) {
        for (int POBcount = 10; POBcount > 0; POBcount--) {
            try {
                        PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PositionOnBoard = ? WHERE Score = (SELECT MAX(Score) FROM HighScores WHERE Difficulty = ? AND PositionOnBoard < ? LIMIT 1) AND Difficulty = ?");
                        ps.setInt(1, POBcount);
                        ps.setString(2, Difficulty);
                        ps.setInt(3, POBcount);
                        ps.setString(4, Difficulty);
                        ps.executeUpdate();
                System.out.println("Update successful");
            } catch (Exception exception) {
                System.out.println("Database error: " + exception.getMessage());
            }
        }
    }


}