package smartpi;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Map;
import org.mortbay.util.ajax.JSON;

/**
 * @version %I%
 * @since 2018-12-31
 * @since 1.8
 */
public class ReactInterface {

  public static final String BASE_FILE_PATH = "server/api";

  /**
   * Writes provided sensor data to the sensor json file.
   *
   * Creates a map, populates it and encodes it to json format.
   *
   * @param temperature the measured temperature
   * @param humidity the measured humidity
   * @return whether writing the file was successful or not
   */
  public static boolean writeSensorData(double temperature, double humidity) {
    Map<String, Double> map = new HashMap<>();
    map.put("temperature", temperature);
    map.put("humidity", humidity);
    return write(JSON.toString(map), BASE_FILE_PATH + "/sensor.json");
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
   * Writes the provided events to the events json file.
   *
   * Accepts a variable number of arguments.
   *
   * @param events the events to be written
   * @return whether writing the file was successful or not
   */
  @SafeVarargs
  public static boolean writeEvents(Map<String, String>... events) {
    return write(JSON.toString(events), BASE_FILE_PATH + "/calendar.json");
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
   * Writes the provided email messages to the email json file.
   *
   * Accepts a variable number of arguments.
   *
   * @param email the email messages to be written
   * @return whether writing the file was successful or not
   */
  @SafeVarargs
  public static boolean writeEmail(Map<String, String>... email) {
    return write(JSON.toString(email), BASE_FILE_PATH + "/email.json");
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
    boolean success = writeSensorData(25, 80)
        && writeEvents(makeEvent("title1", "date1"),
        makeEvent("title2", "date2"),
        makeEvent("title3", "date3"))
        && writeEmail(makeEmail("sender1", "subject1", "content1"),
        makeEmail("sender2", "subject2", "content2"),
        makeEmail("sender3", "subject3", "content3"));
    if (!success) {
      System.exit(1);
    }
  }
}
