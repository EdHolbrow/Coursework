package Controllers;

import Server.Main;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserController {


    public static void insertUser(int UserID, String Name, int BestScore, String Password) {
        if (passwordcheck(Password) == true) {

            try {
                PreparedStatement ps = Main.db.prepareStatement("INSERT INTO Users (UserID, Name, BestScore, Password) VALUES (?, ?, ?, ?)");
                ps.setInt(1, UserID);
                ps.setString(2, Name);
                ps.setInt(3, BestScore);
                ps.setString(4, Password);
                ps.executeUpdate();
            } catch (Exception exception) {
                System.out.println("Database error: " + exception.getMessage());
            }
        } else {
            System.out.println("Validation error: password does not meet requirements, please try a different password");
        }
    }
    public static void selectUser(int UserIDSelected) {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Users WHERE UserID = ? ");
            ps.setInt(1, UserIDSelected);
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