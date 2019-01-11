package smartpi;

public class SmartPiMain {

  public static final int FREQUENCY_TEMPERATURE_MS = 5000;

  public static void main(String[] args) {
    new Thread(new Temperature()).start();
    CheckingMails checkingMails = new CheckingMails();
    checkingMails.run();
    CalendarQuickstart calendarQuickstart = new CalendarQuickstart();
    calendarQuickstart.run();
  }
}
