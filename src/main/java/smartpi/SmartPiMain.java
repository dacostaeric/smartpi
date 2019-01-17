package smartpi;

public class SmartPiMain {

  public static final int FREQUENCY_ALARMCLOCK_MS = 1000;
  public static final int FREQUENCY_TEMPERATURE_MS = 60000;
  public static final int FREQUENCY_MAIL_MS = 300000;
  public static final int FREQUENCY_CALENDAR_MS = 300000;

  public static void main(String[] args) {
    new Thread(new AlarmSpeak()).start();
    new Thread(new Temperature()).start();
    new Thread(new CheckingMails()).start();
    new Thread(new CalendarQuickstart()).start();
  }
}
