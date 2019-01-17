package smartpi.server;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import smartpi.CalendarQuickstart;
import smartpi.CheckingMails;
import smartpi.Temperature;
import smartpi.server.handler.CalendarHandler;
import smartpi.server.handler.EmailHandler;
import smartpi.server.handler.IndexHandler;
import smartpi.server.handler.SensorHandler;

public class Server implements Runnable {

  public static final String BASE_PATH = "server";

  public static final int PORT = 3001;

  @Override
  public void run() {
    try {
      HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
      try {
        server.createContext("/", new IndexHandler(BASE_PATH + "/index.html"));
      } catch (IOException e) {
        e.printStackTrace();
      }
      EmailHandler emailHandler = new EmailHandler(new CheckingMails());
      server.createContext("/api/email", emailHandler);
      server.createContext("/api/email.json", emailHandler);

      CalendarHandler calendarHandler = new CalendarHandler(new CalendarQuickstart());
      server.createContext("/api/calendar", calendarHandler);
      server.createContext("/api/calendar.json", calendarHandler);

      SensorHandler sensorHandler = new SensorHandler(new Temperature());
      server.createContext("/api/sensor", sensorHandler);
      server.createContext("/api/sensor.json", sensorHandler);


      server.start();
      System.out.println("Server running on " + PORT);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void main(String[] args) {
    new Server().run();
  }
}
