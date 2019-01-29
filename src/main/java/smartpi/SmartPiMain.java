package smartpi;

import smartpi.server.Server;

public class SmartPiMain {

  @Deprecated
  public static final int FREQUENCY_ALARMCLOCK_MS = 1000;
  @Deprecated
  public static final int FREQUENCY_TEMPERATURE_MS = 60000;
  @Deprecated
  public static final int FREQUENCY_MAIL_MS = 300000;
  @Deprecated
  public static final int FREQUENCY_CALENDAR_MS = 300000;

  public static void main(String[] args) {
    if (args.length > 0) {
      try {
        new Server(Integer.parseInt(args[0]), new CalendarQuickstart(), new CheckingMails(),
            new Temperature()).run();
        return;
      } catch (NumberFormatException e) {
        Logger.warn("Could not parse port. Using 80.");
      }
    }
    new Server(new CalendarQuickstart(), new CheckingMails(), new Temperature()).run();
  }
}
