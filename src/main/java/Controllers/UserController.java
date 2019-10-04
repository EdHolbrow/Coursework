package Controllers;

import Server.Main;
import com.sun.jersey.multipart.FormDataParam;
import org.json.simple.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserController {

    @POST
    @Path("new")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public String insertUser(
            @FormDataParam("UserID") Integer UserID, @FormDataParam("UserName") String UserName, @FormDataParam("BestScore") Integer BestScore, @FormDataParam("Password") String Password) throws Exception {
        if (passwordcheck(Password)) {
            if (UserID == null || UserName == null || BestScore == null ) {
                throw new Exception("One or more form data parameters are missing in the HTTP request.");
            }
            try {
                PreparedStatement ps = Main.db.prepareStatement("INSERT INTO Users (UserID, UserName, BestScore, Password) VALUES (?, ?, ?, ?)");
                ps.setInt(1, UserID);
                ps.setString(2, UserName);
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

    @GET
    @Path("get/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String selectUser(@PathParam("id") Integer id) throws Exception {
        if (id == null) {
            throw new Exception("Thing's 'id' is missing in the HTTP request's URL.");
        }
        System.out.println("thing/get/" + id);
        JSONObject item = new JSONObject();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Users WHERE UserID = ? ");
            ps.setInt(1, id);
            ResultSet results = ps.executeQuery();

            if (results.next()) {
                item.put("UserID", id);
                item.put("Name", results.getString(2));
                item.put("BestScore", results.getInt(3));
                item.put("Password", results.getString(4));

            }
            return item.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"error\": \"Unable to get item, please see server console for more info.\"}";

        }
    }

    public static void selectAllUsers() {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Users ");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                int UserID = results.getInt(1);
                String Name = results.getString(2);
                int BestScore = results.getInt(3);
                String Password = results.getString(4);
                System.out.println(UserID + " " + Name + " " + BestScore + " " + Password);
            }
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
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

    public static void deleteDatabase(int UserID) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("DELETE FROM Users WHERE UserID = ?)");
            ps.setInt(1, UserID);
            ps.executeUpdate();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
        }
    }
}