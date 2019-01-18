package smartpi;

import java.text.DateFormat;
import java.util.Date;

public class SmartPiTTS {

  private TextToSpeech tts;

  SmartPiTTS(String voice) {
    tts = new TextToSpeech();
    tts.setVoice(voice);
  }

  public void speakAlarm() {
    StringBuilder string = new StringBuilder();
    string.append("asd"); //good morning
    string.append("asd"); //today
    string.append("asd"); //email
    tts.speak(string.toString(), 1.0f, false, false);
  }

  public void speakEmail(int numberOfMessages) {
    tts.speak("You have " + numberOfMessages + " messages.", 1.0f, false, false);
    if(false) {
      tts.speak("from etc", 1.0f, false, false);
    }
  }

  public void speakEvents(int numberOfEvents) {
    //tts.speak("You have " + numberOfEvents + " events.", 1.0f, false, false);
    // speak your next appointment is NAME at TIME (zb test2 at 8:00 am)
    //Date date = DateFormat.getInstance().parse("");
  }
}
