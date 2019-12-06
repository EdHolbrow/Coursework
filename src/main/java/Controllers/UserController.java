package Controllers;

import Server.Main;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("Users")
public class UserController {

    @POST
    @Path("insertUser")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String insertUser(
            @FormDataParam("UserID") Integer UserID, @FormDataParam("Name") String Name, @FormDataParam("BestScore") Integer BestScore, @FormDataParam("Password") String Password) throws Exception {
        if (passwordcheck(Password)) {
            if (UserID == null || Name == null || BestScore == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            try {
                PreparedStatement ps = Main.db.prepareStatement("INSERT INTO Users (UserID, Name, BestScore, Password) VALUES (?, ?, ?, ?)");
                ps.setInt(1, UserID);
                ps.setString(2, Name);
                ps.setInt(3, BestScore);
                ps.setString(4, Password);
                ps.executeUpdate();
                return "{\"status\": \"OK\"}";
            } catch (Exception exception) {
                System.out.println("Database error: " + exception.getMessage());
                return "{\"error\": \"Unable to create new item, please see server console for more info.\"}";
            }
        } else {
            System.out.println("Validation error: password does not meet requirements, please try a different password");
            return "{\"error\": \"Unable to create new item, please see server console for more info.\"}";
        }
    }

    @POST
    @Path("selectUser")
    @Produces(MediaType.APPLICATION_JSON)
    public String selectUser(@FormDataParam("UserID") String IDSelected) {
        System.out.println("/Users/selectUser");
        JSONArray list = new JSONArray();
        try {
            if (IDSelected == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            PreparedStatement ps = Main.db.prepareStatement("SELECT UserID , Name, BestScore FROM Users WHERE UserID = ? ");
            ps.setString(1, IDSelected);
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("UserID", results.getInt(1));
                item.put("Name", results.getString(2));
                item.put("BestScore", results.getInt(3));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list item, please see server console for more info.\"}";
        }
    }


    @GET
    @Path("selectAllUsers")
    @Produces(MediaType.APPLICATION_JSON)
    public String selectAllUsers() {
        System.out.println("users/selectAllUsers");
        JSONArray list = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT UserID , Name, BestScore FROM Users ");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject item = new JSONObject();
                item.put("UserID", results.getString(1));
                item.put("Name", results.getString(2));
                item.put("BestScore", results.getInt(3));
                list.add(item);
            }
            return list.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list items, please see server console for more info.\"}";
        }
    }

    public static boolean passwordcheck(String password) {
        boolean letterFlag = false;
        boolean intFlag = false;
        for (int i = 0; i < password.length(); i++) {
            if ((Character.isLetter(password.charAt(i)) == true)) {
                letterFlag = true;
            }
            if ((Character.isDigit(password.charAt(i)) == true)) {
                intFlag = true;
            }
        }
        if (letterFlag == true && intFlag == true) {
            return true;
        } else {
            return false;
        }
    }

    @POST
    @Path("deleteUser")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteUser(@FormDataParam("UserID") Integer UserID, @FormDataParam("Name") String Name, @FormDataParam("Password") String Password) {
        if (PasswordValidation(UserID, Name, Password)) {
            try {
                if (UserID == null) {
                    throw new Exception("One or more form data parameters are missing in the HTTP request.");
                }
                System.out.println("Users/deleteUser id=" + UserID);

                PreparedStatement ps = Main.db.prepareStatement("DELETE FROM Users WHERE UserID = ?");
                ps.setInt(1, UserID);
                ps.executeUpdate();
                return "{\"status\": \"OK\"}";
            } catch (Exception exception) {
                System.out.println("Database error: " + exception.getMessage());
                return "{\"error\": \"Unable to delete item, please see server console for more info.\"}";

            }
        } else {
            System.out.println("Validation error: password is not correct, please try a different password");
            return "{\"error\": \"Unable to delete item, please see server console for more info.\"}";
        }
    }

    public static boolean PasswordValidation(int IDEntered, String nameEntered, String passwordEntered) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Users WHERE Name = ? AND Password =? AND UserID = ?");
            ps.setString(1, nameEntered);
            ps.setString(2, passwordEntered);
            ps.setInt(3, IDEntered);
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                int UserID = results.getInt("UserID");
                String Name = results.getString("Name");
                int BestScore = results.getInt("BestScore");
                String Password = results.getString("Password");
                if (results.getInt("UserID") == IDEntered) {
                    System.out.println(results.getInt("UserID") == IDEntered);
                    return true;
                }
            }

        } catch (Exception exception) {
            return false;
        }
        return false;
    }

    public static void UserReplace(int UserID, String Name) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("UPDATE HighScores SET PlayerName = 'Guest' AND UserID = 0 WHERE UserID = ? AND Difficulty = ?");
            ps.setInt(1, UserID);
            ps.setString(2, Name);
            ps.executeUpdate();
            System.out.println("Update successful");
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }



    @POST
    @Path("credentialCheck")
    @Produces(MediaType.APPLICATION_JSON)
    public String credentialCheck(@FormDataParam("Name") String LoginName, @FormDataParam("Password") String LoginPassword) {
        System.out.println("/Users/credentialCheck");

        try {
            if (LoginName == null) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            PreparedStatement ps = Main.db.prepareStatement("SELECT Password FROM Users WHERE Name = ? ");
            ps.setString(1, LoginName);
            ResultSet results = ps.executeQuery();
            if (results.next()) {
                String CorrectPassword = results.getString(1);
                if (LoginPassword.equals(CorrectPassword)) {
                    JSONObject currentUser = new JSONObject();
                    currentUser.put("Name", LoginName);
                    return currentUser.toString();
                } else {
                return "{\"error\": \"Incorrect password!\"}";
            }
        } else {
            return "{\"error\": \"Unknown user!\"}";
        }
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to list item, please see server console for more info.\"}";
        }
    }
}