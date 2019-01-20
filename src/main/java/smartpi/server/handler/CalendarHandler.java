package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.net.UnknownHostException;
import org.mortbay.util.ajax.JSON;
import smartpi.CalendarQuickstart;

public class CalendarHandler extends SmartPiHandler implements HttpHandler {

  CalendarQuickstart calendar;

  public CalendarHandler(CalendarQuickstart calendar) {
    this.calendar = calendar;
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
    try {
      respondAPI(httpExchange, JSON.toString(calendar.getEventsAsArrayList()).getBytes());
    } catch (UnknownHostException e) {
      respondError(httpExchange, e.getMessage().getBytes());
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
