package smartpi.server;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import smartpi.AlarmSpeak;
import smartpi.CalendarQuickstart;
import smartpi.CheckingMails;
import smartpi.SmartPiTTS;
import smartpi.Temperature;
import smartpi.server.handler.AlarmSpeakHandler;
import smartpi.server.handler.CalendarHandler;
import smartpi.server.handler.EmailHandler;
import smartpi.server.handler.IndexHandler;
import smartpi.server.handler.SensorHandler;

public class Server implements Runnable {

  public static final String BASE_PATH = "server/";
  public static final int PORT = 3001;

  private CalendarQuickstart calendarQuickstart;
  private CheckingMails checkingMails;
  private Temperature temperature;

  public Server() {
    this(new CalendarQuickstart(), new CheckingMails(), new Temperature());
  }

  public Server(CalendarQuickstart calendarQuickstart, CheckingMails checkingMails,
      Temperature temperature) {
    this.calendarQuickstart = calendarQuickstart;
    this.checkingMails = checkingMails;
    this.temperature = temperature;
  }

  @Override
  public void run() {
    try {
      HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
      try {
        server.createContext("/", new IndexHandler(BASE_PATH + "index.html"));
      } catch (IOException e) {
        e.printStackTrace();
      }
      EmailHandler emailHandler = new EmailHandler(checkingMails);
      server.createContext("/api/email", emailHandler);
      server.createContext("/api/email.json", emailHandler);

      CalendarHandler calendarHandler = new CalendarHandler(calendarQuickstart);
      server.createContext("/api/calendar", calendarHandler);
      server.createContext("/api/calendar.json", calendarHandler);

      SensorHandler sensorHandler = new SensorHandler(temperature);
      server.createContext("/api/sensor", sensorHandler);
      server.createContext("/api/sensor.json", sensorHandler);

      AlarmSpeakHandler alarmSpeakHandler = new AlarmSpeakHandler(new SmartPiTTS("cmu-rms-hsmm",
          calendarQuickstart, checkingMails));
      server.createContext("/api/alarm/speak", alarmSpeakHandler);

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
