package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import org.json.JSONArray;
import smartpi.CalendarQuickstart;
import smartpi.Logger;

public class CalendarHandler extends SmartPiHandler implements HttpHandler {

  private static final long FREQUENCY = 300000000000L;

  private CalendarQuickstart calendar;
  private long timestamp = 0;

  public CalendarHandler(CalendarQuickstart calendar) {
    this.calendar = calendar;
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
    try {
      if (timestamp == 0 || System.nanoTime() - timestamp > FREQUENCY) {
        Logger.debug("New " + timestamp);
        respondAPI(httpExchange, new JSONArray(calendar.getNewEvents()).toString().getBytes());
        timestamp = System.nanoTime();
      } else {
        Logger.debug("Cached " + timestamp);
        respondAPI(httpExchange,
            new JSONArray(calendar.getAlreadLoadedEvents()).toString().getBytes());
      }
    } catch (Exception e) {
      respondError(httpExchange, e.getMessage().getBytes());
    }
  }
}
