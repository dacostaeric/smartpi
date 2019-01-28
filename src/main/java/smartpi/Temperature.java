package smartpi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;

public class Temperature {

  static String line;
  static float humidity = 0;
  static float temperature = 0;
  static boolean lightOn = false;

  public Map<String, Object> getSensorData() throws IOException, InterruptedException {
    // try {
    Runtime runtime = Runtime.getRuntime();
    Process process = runtime.exec("python3 /home/pi/Desktop/dht11.py");
    BufferedReader bufferedReader = new BufferedReader(
        new InputStreamReader(process.getInputStream()));
    line = bufferedReader.readLine();
    // System.out.println(line);
    String[] data = line.split(" ");
    temperature = Float.parseFloat(data[0]);
    humidity = Float.parseFloat(data[1]);
    if (Integer.parseInt(data[2]) == 1) {
      lightOn = true;
    } else {
      lightOn = false;
    }
    bufferedReader.close();
    process.waitFor();
    System.out.println("Temperature is : " + temperature + " °C.");
    System.out.println("Humidity is :" + humidity + " %.");
//    } catch (Exception e) {
//      e.getStackTrace();
//    }
    return ReactInterface.makeSensor(temperature, humidity, lightOn);
  }

  @Deprecated
  public void run() {
    while (true) {
      //runOnce();
      try {
        Thread.sleep(SmartPiMain.FREQUENCY_TEMPERATURE_MS);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }
}
