package smartpi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Temperature implements Runnable {

    static String line;
    static float humidity = 0;
    static float temperature = 0;
    static boolean lightOn = false;

    public void run() {
      while(true) {
        try {
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
          }
          bufferedReader.close();
          process.waitFor();
          System.out.println("Temperature is : " + temperature + " °C.");
          System.out.println("Humidity is :" + humidity + " %.");
        } catch (Exception e) {
          e.getStackTrace();
        }

        ReactInterface.writeSensorData(temperature, humidity, lightOn);
        try {
          Thread.sleep(SmartPiMain.FREQUENCY_TEMPERATURE_MS);
        } catch (Exception e) {

        }
      }
    }
}
