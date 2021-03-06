package smartpi.server;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import smartpi.CalendarQuickstart;
import smartpi.CheckingMails;
import smartpi.Logger;
import smartpi.SmartPiTTS;
import smartpi.Temperature;
import smartpi.server.handler.AlarmHandler;
import smartpi.server.handler.AlarmSpeakHandler;
import smartpi.server.handler.CalendarHandler;
import smartpi.server.handler.EmailHandler;
import smartpi.server.handler.IndexHandler;
import smartpi.server.handler.SensorHandler;
import smartpi.server.handler.ShoppingListHandler;

public class Server implements Runnable {

  public static final String BASE_PATH = "server/";

  private int port;
  private CalendarQuickstart calendarQuickstart;
  private CheckingMails checkingMails;
  private Temperature temperature;

  public Server() {
    this(80, new CalendarQuickstart(), new CheckingMails(), new Temperature());
  }

  public Server(CalendarQuickstart calendarQuickstart, CheckingMails checkingMails,
      Temperature temperature) {
    this(80, calendarQuickstart, checkingMails, temperature);
  }

  public Server(int port, CalendarQuickstart calendarQuickstart, CheckingMails checkingMails,
      Temperature temperature) {
    this.port = port;
    this.calendarQuickstart = calendarQuickstart;
    this.checkingMails = checkingMails;
    this.temperature = temperature;
  }

  @Override
  public void run() {
    try {
      HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
      try {
        server.createContext("/", new IndexHandler(BASE_PATH + "index.html"));
      } catch (IOException e) {
        e.printStackTrace();
      }

      AlarmHandler alarmHandler = new AlarmHandler();
      server.createContext("/api/alarm", alarmHandler);

      AlarmSpeakHandler alarmSpeakHandler = new AlarmSpeakHandler(new SmartPiTTS("cmu-rms-hsmm",
          calendarQuickstart, checkingMails));
      server.createContext("/api/alarm/speak", alarmSpeakHandler);

      SensorHandler sensorHandler = new SensorHandler(temperature);
      server.createContext("/api/sensor", sensorHandler);

      ShoppingListHandler shoppingListHandler = new ShoppingListHandler();
      server.createContext("/api/shop", shoppingListHandler);

      CalendarHandler calendarHandler = new CalendarHandler(calendarQuickstart);
      server.createContext("/api/calendar", calendarHandler);

      EmailHandler emailHandler = new EmailHandler(checkingMails);
      server.createContext("/api/email", emailHandler);

      server.start();
      Logger.info("Server running on " + port);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void main(String[] args) {
    new Server().run();
  }
}
