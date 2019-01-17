package smartpi;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

public class SmartPiTTS {

  static CalendarQuickstart calendarQuickstart;
  private static TextToSpeech tts;

  SmartPiTTS(String voice) {
    tts = new TextToSpeech();
    tts.setVoice(voice);
    calendarQuickstart = new CalendarQuickstart();
  }

  public static void speakAlarm() {
    tts.speak("Good morning! ", 1.0f, false, true); //Why so silent?
    speakEvents();
  }

  public void speakEmail(int numberOfMessages) {
    tts.speak("You have " + numberOfMessages + " messages.", 1.0f, false, false);
    if (false) {
      tts.speak("from etc", 1.0f, false, false);
    }
  }

  public static ArrayList<Map<String, String>> getEvents() {
    return calendarQuickstart.getEventsAsArrayList();
  }

  public static Map<String, String> getNextEvent() {
    ArrayList<Map<String, String>> list;
    list = getEvents();
    return list.get(0);
  }

  public static boolean isNextEventToday() {
    String date = getNextEvent().toString().subSequence(6, 16).toString();
    Calendar today = Calendar.getInstance();
    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    return date.equals(dateFormat.format(today.getTime()));
  }

  public static String getEventName() {
    return getNextEvent().toString().subSequence(43, getNextEvent().toString().length() - 1)
        .toString();
  }

  public static String getEventTime() {
    return getNextEvent().toString().subSequence(17, 22).toString();
  }

  public static void speakEvents() {
    if (getEvents().size() > 0) {
      tts.speak("You have " + getEvents().size() + " upcoming events.", 1.0f, false, true);
      if (isNextEventToday()) {
        tts.speak("Your next appointment today is " + getEventName() + " at " + getEventTime(),
            1.0f, false, true);
      } else {
        tts.speak("You have no appointments today.", 1.0f, false, true);
      }
    } else {
      tts.speak("You have no appointments in your calendar.", 1.0f, false, true);
    }
  }

  public static void main(String[] args) {
    SmartPiTTS smartPiTTS = new SmartPiTTS("cmu-rms-hsmm");
    speakAlarm();
  }
}
