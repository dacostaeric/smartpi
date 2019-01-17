package smartpi;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.mail.Message;
import org.mortbay.util.ajax.JSON;

/**
 * @version %I%
 * @since 2018-12-31
 * @since 1.8
 */
public class ReactInterface {

  public static final String BASE_FILE_PATH = "server/api";

  public static Map<String, Object> makeSensor(double temperature, double humidity,
      boolean lights) {
    Map<String, Object> map = new HashMap<>();
    map.put("temperature", temperature);
    map.put("humidity", humidity);
    map.put("lights", lights);
    return map;
  }

  /**
   * Creates a map which represents an event with the provided content.
   *
   * The map will always have "title" and "date" keys, no matter what is provided. For easy creation
   * of event maps when writing a file.
   *
   * @param title the event title
   * @param date the event date
   * @return the event represented as a map
   */
  public static Map<String, String> makeEvent(String title, String date) {
    Map<String, String> event = new HashMap<>();
    event.put("title", title);
    event.put("date", date);
    return event;
  }

  /**
   * Creates a map which represents an email message with the provided content.
   *
   * The map will always have "sender", "subject" and "content" keys, no matter what is provided.
   * For easy creation of email maps when writing a file.
   *
   * @param sender the sender
   * @param subject the subject
   * @param content the message content
   * @return the email message represented as a map
   */
  public static Map<String, String> makeEmail(String sender, String subject, String content) {
    Map<String, String> event = new HashMap<>();
    event.put("sender", sender);
    event.put("subject", subject);
    event.put("content", content);
    return event;
  }

  /**
   * This method's name is too ambiguous. Use writeCalendar instead.
   *
   * Writes the provided events to the calendar json file.
   *
   * Accepts a variable number of arguments.
   *
   * @param events the events to be written
   * @return whether writing the file was successful or not
   */
  @SafeVarargs
  @Deprecated
  public static boolean writeEvents(Map<String, String>... events) {
    return write(JSON.toString(events), BASE_FILE_PATH + "/calendar.json");
  }

  /**
   * Writes provided sensor data to the sensor json file.
   *
   * Creates a map, populates it and encodes it to json format.
   *
   * @param temperature the measured temperature
   * @param humidity the measured humidity
   * @param lightsOn whether the lights are on or not
   * @return whether writing the file was successful or not
   */
  @Deprecated
  public static boolean writeSensorData(double temperature, double humidity, boolean lightsOn) {
    Map<String, Double> environmentMap = new HashMap<>();
    environmentMap.put("temperature", temperature);
    environmentMap.put("humidity", humidity);
    Map<String, Boolean> lightMap = new HashMap<>();
    lightMap.put("lights", lightsOn);
    return write(JSON.toString(environmentMap), BASE_FILE_PATH + "/sensor.json")
        && write(JSON.toString(lightMap), BASE_FILE_PATH + "/lights.json");
  }

  /**
   * Writes the provided events to the calendar json file.
   *
   * Accepts a variable number of arguments.
   *
   * @param events the events to be written
   * @return whether writing the file was successful or not
   */
  @SafeVarargs
  @Deprecated
  public static boolean writeCalendar(Map<String, String>... events) {
    return write(JSON.toString(events), BASE_FILE_PATH + "/calendar.json");
  }

  /**
   * Writes the provided email messages to the email json file.
   *
   * Accepts a variable number of arguments.
   *
   * @param email the email messages to be written
   * @return whether writing the file was successful or not
   */
  @SafeVarargs
  @Deprecated
  public static boolean writeEmail(Map<String, String>... email) {
    return write(JSON.toString(email), BASE_FILE_PATH + "/email.json");
  }

  @Deprecated
  public static boolean writeEmail(Message[] messages) {
    Map<String, String>[] maps = new HashMap[messages.length];
    for (int i = 0; i < messages.length; i++) {
      try {
        maps[i] = makeEmail(messages[i].getFrom()[0].toString(), messages[i].getSubject(),
            messages[i].getContent().toString());
      } catch (Exception e) {
        System.out.println("Couldn't save message: " + e.getMessage());
      }
    }
    return writeEmail(maps);
  }

  @Deprecated
  public static boolean turnAlarmOn() {
    return write("{\"ringing\":true}", BASE_FILE_PATH + "/alarm_turn_off.json");
  }

  /**
   * This method's name is ambiguous. It has been replaced with isAlarmRinging().
   *
   * @return whether or not the alarm is ringing
   * @throws IOException when a reading error occurs
   */
  @Deprecated
  public static synchronized boolean alarmStatus() throws IOException {
    BufferedReader reader = new BufferedReader(
        new FileReader(new File(BASE_FILE_PATH + "/alarm_turn_off.json")));
    String line = reader.readLine();
    return line.contains("true");
  }

  /**
   * Returns whether the alarm is currently ringing.
   *
   * @return whether or not the alarm is ringing
   * @throws IOException when a file error occurs
   * @throws NullPointerException when a reading error occurs
   */
  @Deprecated
  public static synchronized boolean isAlarmRinging() throws IOException, NullPointerException {
    BufferedReader reader = new BufferedReader(
        new FileReader(new File(BASE_FILE_PATH + "/alarm_turn_off.json")));
    String line = reader.readLine();
    return line.contains("true");
  }

  /**
   * Returns whether the alarm should speak.
   *
   * @return whether or not the alarm should speak
   * @throws IOException when a file error occurs
   * @throws NullPointerException when a reading error occurs
   */
  @Deprecated
  public static synchronized boolean shouldAlarmSpeak() throws IOException, NullPointerException {
    BufferedReader reader = new BufferedReader(
        new FileReader(new File(BASE_FILE_PATH + "/alarm_speak.json")));
    String line = reader.readLine();
    return line.contains("true");
  }

  @Deprecated
  public static boolean turnSpeakOff() {
    return write("{\"speak\": false}", BASE_FILE_PATH + "/alarm_speak.json");
  }

  /**
   * Generic method for writing to a file.
   *
   * Writes the content string to the specified file.
   *
   * @param content the file contents
   * @param filepath the file path
   * @return whether writing the file was successful or not
   */
  public static boolean write(String content, String filepath) {
    try {
      BufferedWriter writer = new BufferedWriter(new FileWriter(new File(filepath)));
      writer.write(content);
      writer.newLine();
      writer.close();
    } catch (Exception e) {
      return false;
    }
    return true;
  }

  // writes dummy files with arbitrary data for testing and exits 1 on failure
  public static void main(String[] args) {
    boolean success = writeSensorData(25, 80, true)
        && writeCalendar(makeEvent("title1", "date1"),
        makeEvent("title2", "date2"),
        makeEvent("title3", "date3"))
        && writeEmail(makeEmail("sender1", "subject1", "content1"),
        makeEmail("sender2", "subject2", "content2"),
        makeEmail("sender3", "subject3", "content3"))
        && turnAlarmOn();
    try {
      System.out.println("alarm status: " + isAlarmRinging());
    } catch (IOException e) {
      System.exit(2);
    }
    if (!success) {
      System.exit(1);
    }
  }
}
