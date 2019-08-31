import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserController {
    public static void insertUser(int UserID, String Name, int BestScore, String Password) {
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
    }
    public static void selectUser() {
        try {

            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Users WHERE UserID = ? ");

            ResultSet results = ps.executeQuery();

            while (results.next()) {
                int UserID = results.getInt(1);
                String Name = results.getString(2);
                int BestScore = results.getInt(3);
                String Password = results.getString(4);
                System.out.println(UserID + " " + Name + " " + BestScore + " " + Password);
            }
        }
        catch(Exception exception){
            System.out.println("Database error: " + exception.getMessage());
        }

    }
    public static void selectAllUsers() {
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM Users");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                int UserID = results.getInt(1);
                String Name = results.getString(2);
                int BestScore = results.getInt(3);
                String Password = results.getString(4);
                System.out.println(UserID + " " + Name + " " + BestScore + " " + Password);
            }
        }
        catch(Exception exception){
            System.out.println("Database error: " + exception.getMessage());
        }
    }
}
