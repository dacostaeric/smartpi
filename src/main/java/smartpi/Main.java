package smartpi;


public class Main {

  /**
   * The main method from which our application is starting
   */
  public static void main(String[] args) {
    //Create TextToSpeech
    TextToSpeech tts = new TextToSpeech();

    //Print all the available voices
    tts.getAvailableVoices().stream().forEach(voice -> System.out.println("Voice: " + voice));

    // Setting the Current Voice
    tts.setVoice("dfki-pavoque-neutral-hsmm");
    tts.speak("Ich kann nicht glauben, dass es funktioniert hat!", 1.0f, false, false);

  }
}
