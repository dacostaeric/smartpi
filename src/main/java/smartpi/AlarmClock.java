package smartpi;

import java.time.LocalTime;

public class AlarmClock {
  public String alarmHour;
  public String alarmMinute;
  public String alarmSecond;

  public AlarmClock(String alarmHour, String alarmMinute, String alarmSecond) {
    this.alarmHour = alarmHour;
    this.alarmMinute = alarmMinute;
    this.alarmSecond = alarmSecond;
  }

  public String getAlarmTime() {
    return this.alarmHour + ":" + this.alarmMinute + ":" + this.alarmSecond;
  }

  static String getCurrentTime() {
    LocalTime localTime = LocalTime.now();
    String hour = "" + localTime.getHour();
    String minute = "" + localTime.getMinute();
    String second = "" + localTime.getSecond();
    if (localTime.getHour() < 10) {
      hour = "0" + hour;
    }
    if (localTime.getMinute() < 10) {
      minute = "0" + minute;
    }
    if (localTime.getSecond() < 10) {
      second = "0" + second;
    }
    return hour + ":" + minute + ":"
        + second;
  }

  public boolean checkAlarm() {
    String currentTime = getCurrentTime();
    if (alarmHour.equals(currentTime.substring(0, 2)) && alarmMinute.equals(currentTime.substring(3, 5)) && alarmSecond.equals(currentTime.substring(6))) {
      System.out.println("Work on your fucking project!");
      return true;
    } else {
      //System.out.println("Current time: " + currentTime);
      return false;
    }
  }

  public static void main(String[] args) {
    AlarmClock alarm = new AlarmClock("22","14","00");
    System.out.println("Your alarm was set to: " + alarm.getAlarmTime());
    boolean ringed = false;
    while(!ringed) {
      ringed = alarm.checkAlarm();
    }
    System.out.println("You're done now.");
  }

}
