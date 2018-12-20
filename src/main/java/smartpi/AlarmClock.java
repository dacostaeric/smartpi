package smartpi;

import java.time.LocalTime;

public class AlarmClock {
  public int alarmHour;
  public int alarmMinute;
  public int alarmSecond;

  public AlarmClock(int alarmHour, int alarmMinute, int alarmSecond) {
    this.alarmHour = alarmHour;
    this.alarmMinute = alarmMinute;
    this.alarmSecond = alarmSecond;
  }

  public String getAlarmTime() {
    return this.alarmHour + ":" + this.alarmMinute + ":" + this.alarmSecond;
  }

  static String getCurrentTime() {
    LocalTime localTime = LocalTime.now();
    return localTime.getHour() + ":" + localTime.getMinute() + ":"
        + localTime.getSecond();
  }

  public static void main(String[] args) {
    AlarmClock alarm = new AlarmClock(21, 36,00);
    System.out.println(alarm.getAlarmTime());
    System.out.println(getCurrentTime());
  }

}
