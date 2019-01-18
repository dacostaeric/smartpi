package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import org.mortbay.util.ajax.JSON;
import smartpi.Temperature;

public class SensorHandler extends SmartPiHandler implements HttpHandler {

  Temperature temperature;

  public SensorHandler(Temperature temperature) {
    this.temperature = temperature;
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
    respondAPI(httpExchange, JSON.toString(temperature.getSensorData()).getBytes());
  }
}
