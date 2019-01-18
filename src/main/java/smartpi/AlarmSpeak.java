package smartpi;

public class AlarmSpeak implements Runnable {

  private void speak() {
    System.out.println("Speaking");
    try {
      Thread.sleep(5000);
    } catch (Exception e) {

    }
  }

  @Override
  public void run() {
    boolean speak = false;
    while(true) {
      if(speak) {
        speak();
        while(!ReactInterface.turnSpeakOff()) {

        }
      }
      try {
        speak = ReactInterface.shouldAlarmSpeak();
        Thread.sleep(SmartPiMain.FREQUENCY_ALARMCLOCK_MS);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

  public static void main(String[] args) {
    new AlarmSpeak().run();
  }
}
