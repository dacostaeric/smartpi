package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import org.json.JSONArray;
import smartpi.CheckingMails;

public class EmailHandler extends SmartPiHandler implements HttpHandler {

  private static final long FREQUENCY = 300000000000L;

  private CheckingMails email;
  private long timestamp = 0;

  public EmailHandler(CheckingMails email) {
    this.email = email;
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
    try {
      if (timestamp == 0 || System.nanoTime() - timestamp > FREQUENCY) {
        respondAPI(httpExchange, new JSONArray(email.getNewMails()).toString().getBytes());
        timestamp = System.nanoTime();
      } else {
        respondAPI(httpExchange,
            new JSONArray(email.getAlreadyLoadedMails()).toString().getBytes());
      }
    } catch (Exception e) {
      respondError(httpExchange, e.getMessage().getBytes());
    }
  }
}
