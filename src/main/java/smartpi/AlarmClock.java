package smartpi;

import java.io.IOException;
import java.time.LocalTime;
import java.util.concurrent.TimeUnit;

public class AlarmClock {
  public String alarmHour;
  public String alarmMinute;
  public String alarmSecond;
  public boolean isRinging;

  public AlarmClock(String alarmHour, String alarmMinute, String alarmSecond, boolean isRinging) {
    this.alarmHour = alarmHour;
    this.alarmMinute = alarmMinute;
    this.alarmSecond = alarmSecond;
    this.isRinging = isRinging;
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

  public void setRingingTrue() {
    ReactInterface.turnAlarmOn();
    this.isRinging = true;
    System.out.println("Ring");
  }

  public boolean checkIfTurnedOff() {
    boolean alarmStatus = true;
    try {
      alarmStatus = ReactInterface.alarmStatus();
    } catch (IOException e) {
      e.getStackTrace();
    }
    if (this.isRinging && !alarmStatus) {
      return true;
    } else {
      return false;
    }
  }

  public boolean checkAlarm() {
    String currentTime = getCurrentTime();
    if (alarmHour.equals(currentTime.substring(0, 2)) && alarmMinute.equals(currentTime.substring(3, 5)) && alarmSecond.equals(currentTime.substring(6))) {
      setRingingTrue();
      while (!checkIfTurnedOff()) {
        if (checkIfTurnedOff()) {
          System.out.println("You turned it off.");
        }
      }
      return true;
    } else {
      System.out.println("Current time: " + currentTime);
      return false;
    }
  }

  public static void main(String[] args) {
    AlarmClock alarm = new AlarmClock("11","10","00", false);
    System.out.println("Your alarm was set to: " + alarm.getAlarmTime());
    boolean ringed = false;
    while(!ringed) {
      try {
        TimeUnit.SECONDS.sleep(1);
      } catch (InterruptedException ex) {
        System.out.println("Won't happen.");
      }
      ringed = alarm.checkAlarm();
    }
    System.out.println("You're done now.");
  }

}
