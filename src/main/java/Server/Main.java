package Server;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;
import org.sqlite.SQLiteConfig;

import java.sql.Connection;
import java.sql.DriverManager;

public class Main {

    public static Connection db = null;

    public static void main(String[] args) {
        //this opens the database
        openDatabase("CWDatabase1.db");
        //this prepares the jersey servlet
        ResourceConfig config = new ResourceConfig();
        config.packages("Controllers");
        config.register(MultiPartFeature.class);
        ServletHolder servlet = new ServletHolder(new ServletContainer(config));
        //this prepares the jetty server to listen to the specific port and connects the servlet to the server
        Server server = new Server(8081);
        ServletContextHandler context = new ServletContextHandler(server, "/");
        context.addServlet(servlet, "/*");
        //this starts the server
        try {
            server.start();
            System.out.println("Server successfully started.");
            server.join();
        } catch (Exception e) {
            e.printStackTrace();
        }        closeDatabase();
    }

    //  HighscoreController.updateScore(11, "Greg", "Easy", 1);

//HighscoreController.selectDifficulty("Easy");
    //Controllers.HighscoreController.selectDatabase();
    //Controllers.HighscoreController.insertDatabase();
    // Controllers.HighscoreController.updateDatabase(PlayerName, Difficulty, PositionOnBoard, score, UserID);
    // Controllers.UserController.deleteDatabase(5);
    //this closes the database


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
