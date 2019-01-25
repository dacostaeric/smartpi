package smartpi;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Map;
import javax.mail.MessagingException;

public class SmartPiTTS {

  private CalendarQuickstart calendarQuickstart;
  private CheckingMails checkingMails;
  private TextToSpeech tts;

  public SmartPiTTS(String voice, CalendarQuickstart calendarQuickstart, CheckingMails checkingMails) {
    tts = new TextToSpeech();
    tts.setVoice(voice);
    this.calendarQuickstart = calendarQuickstart;
    this.checkingMails =  checkingMails;
  }

  public boolean speakAlarm() {
    tts.speak("Good morning " + speakEvents() + speakEmail(), 1.0f, false, false);
    return true;
  }

  public String speakEmail() {
    StringBuilder string = new StringBuilder();
    try {
      ArrayList<Map<String, String>> mails = getMails();
      StringBuilder senders = new StringBuilder();
      String tmp;
      if (mails.size() > 0) {
        string.append("You have " + mails.size() + " messages. ");
        for (int i = 0; i < mails.size(); i++) {
          tmp = getSender(getMail(i, mails).toString());
          if (senders.toString().contains(tmp)) {
            int index = senders.toString().indexOf(" from:" + tmp) - 1;
            int j = Character.getNumericValue(senders.charAt(index)) + 1;
            senders.replace(index, index + 1, Integer.toString(j));
          } else {
            senders.append("  ,1 from:");
            senders.append(tmp);
          }
        }
        string.append(senders);
      } else {
        string.append("You don't have any new messages.");
      }
    } catch (Exception e) {
      string.append("Couldn't get messages.");
    }
    return string.toString();
  }

  public ArrayList<Map<String, String>> getMails() throws IOException, MessagingException {
    return checkingMails.getNewMails();
  }

  public Map<String, String> getMail(int index, ArrayList<Map<String, String>> mailList) {
    return mailList.get(index);
  }

  public String getSender(String mail) {
    String[] newArray = new String[3];
    String[] array = mail.split("=");
    newArray[0] = array[1].subSequence(0, array[1].length()-9).toString();//Sender
    newArray[1] = array[2].subSequence(0,array[2].length()-9).toString();//Subject
    newArray[2] = array[3];//Text
    return newArray[0].split("<")[0];
  }

  public ArrayList<Map<String, String>> getEvents() throws IOException, GeneralSecurityException {
    return calendarQuickstart.getNewEvents();
  }

  public Map<String, String> getNextEvent() throws IOException, GeneralSecurityException {
    ArrayList<Map<String, String>> list;
    list = getEvents();
    return list.get(0);
  }

  public boolean isNextEventToday() throws IOException, GeneralSecurityException {
    String date = getNextEvent().toString().subSequence(6, 16).toString();
    Calendar today = Calendar.getInstance();
    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    return date.equals(dateFormat.format(today.getTime()));
  }

  public String getEventName() throws IOException, GeneralSecurityException {
    return getNextEvent().toString().subSequence(43, getNextEvent().toString().length() - 1)
        .toString();
  }

  public String getEventTime() throws IOException, GeneralSecurityException {
    return getNextEvent().toString().subSequence(17, 22).toString();
  }

  public String speakEvents() {
    StringBuilder events = new StringBuilder();
    try {
      if (getEvents().size() > 0) {
        if (getEvents().size() == 1) {
          events.append("You have " + getEvents().size() + " upcoming event.");
        } else {
          events.append("You have " + getEvents().size() + " upcoming events.");
        }
        if (isNextEventToday()) {
          events
              .append("Your next appointment today is " + getEventName() + " at " + getEventTime());
        } else {
          events.append("You have no appointments today.");
        }
      } else {
        events.append("You have no appointments in your calendar.");
      }
    } catch (Exception e) {
      events.append("Couldn't get events.");
    }
    return events.toString();
  }

  public static void main(String[] args) {
    //SmartPiTTS smartPiTTS = new SmartPiTTS("cmu-rms-hsmm");
    //smartPiTTS.speakAlarm();
  }
}
