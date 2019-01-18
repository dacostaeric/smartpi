package smartpi;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Map;

public class SmartPiTTS {

  static CalendarQuickstart calendarQuickstart;
  static CheckingMails checkingMails;
  private static TextToSpeech tts;

  SmartPiTTS(String voice) {
    tts = new TextToSpeech();
    tts.setVoice(voice);
    calendarQuickstart = new CalendarQuickstart();
    checkingMails =  new CheckingMails();
  }

  public static void speakAlarm() {
    tts.speak("Good morning! ", 1.0f, false, true); //Why so silent?
    //speakEvents();
    tts.speak(speakEmail(), 1.0f, false, false);
  }

  public static String speakEmail() {
    ArrayList<Map<String, String>> mails = getMails();
    StringBuilder senders = new StringBuilder();
    if (mails.size() > 0) {
      senders.append("You have " + mails.size() + " messages. ");
      senders.append(" , Your messages are: ");
      for (int i = 0; i < mails.size(); i++) {
        //System.out.println(getSender(getMail(i).toString()));
        senders.append(", from: ");
        senders.append(getSender(getMail(i, mails).toString()));
      }
    } else {
      senders.append("You don't have any new messages.");
    }
    return senders.toString();
  }

  public static ArrayList<Map<String, String>> getMails() {
    return checkingMails.getMailsAsArrayList();
  }

  public static Map<String, String> getMail(int index, ArrayList<Map<String, String>> mailList) {
    return mailList.get(index);
  }

  public static String getSender(String mail) {
    String[] newArray = new String[3];
    String[] array = mail.split("=");
    newArray[0] = array[1].subSequence(0, array[1].length()-9).toString();//Sender
    newArray[1] = array[2].subSequence(0,array[2].length()-9).toString();//Subject
    newArray[2] = array[3];//Text
    return newArray[0].split("<")[0];
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
      if (getEvents().size() == 1) {
        tts.speak("You have " + getEvents().size() + " upcoming event.", 1.0f, false, true);
      } else {
        tts.speak("You have " + getEvents().size() + " upcoming events.", 1.0f, false, true);
      }
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
