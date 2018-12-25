import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Tmp {

	static String line;
	static String[] data;
	static float humidity = 0;
	static float temperature = 0;

	public static void main(String[] args) throws Exception{
		Runtime runtime = Runtime.getRuntime();
		Process process = runtime.exec("python3 /home/pi/Desktop/dht11.py");
		BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
		line = bufferedReader.readLine();
		// System.out.println(line);
		String[] data = line.split(" ",2);
		temperature = Float.parseFloat(data[0]);
		humidity = Float.parseFloat(data[1]);
	  	bufferedReader.close();
      		process.waitFor();
      		System.out.println("Temperature is : " + temperature + " °C.");
		System.out.println("Humidity is :" + humidity + " %.");
	}

}
