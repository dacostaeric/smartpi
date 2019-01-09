package smartpi;

public class SmartPiMain {

  public static void main(String[] args) {
    Temperature temperature = new Temperature();
    temperature.run();
    CheckingMails checkingMails = new CheckingMails();
    checkingMails.run();
    CalendarQuickstart calendarQuickstart = new CalendarQuickstart();
    calendarQuickstart.run();
  }
}
