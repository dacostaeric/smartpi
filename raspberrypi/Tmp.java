import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Tmp {

	private static String line;
	private static String[] data;
	static float humidity=0;
	static float temperature=0;
	public static void main(String[] args) throws Exception {
		Runtime rt= Runtime.getRuntime();
		Process p=rt.exec("python3 /home/pi/Desktop/dht11.py");
		BufferedReader bri = new BufferedReader(new InputStreamReader(p.getInputStream()));
		line = bri.readLine();
		// System.out.println(line);
		String[] data = line.split(" ",2);
		temperature = Float.parseFloat(data[0]);
		humidity = Float.parseFloat(data[1]);
	  	bri.close();
      		p.waitFor();
      		System.out.println("Temperature is : "+temperature+" °C.");
		System.out.println("Humidity is :"+ humidity+" %.");
	}

}
