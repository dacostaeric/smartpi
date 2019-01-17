package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import org.mortbay.util.ajax.JSON;
import smartpi.CalendarQuickstart;

public class CalendarHandler extends SmartPiHandler implements HttpHandler {

  CalendarQuickstart caledar;

  public CalendarHandler(CalendarQuickstart calendar) {
    this.caledar = calendar;
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
//    respondAPI(httpExchange, JSON.toString(new String[2]).getBytes());
    respondAPI(httpExchange, "[{\"title\": \"Java Server Test\",\"date\": \"2019-01-17T18:00:00Z\"}]".getBytes());
  }
}
