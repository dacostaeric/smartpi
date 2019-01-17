package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import org.mortbay.util.ajax.JSON;
import smartpi.CheckingMails;

public class EmailHandler extends SmartPiHandler implements HttpHandler {

  CheckingMails email;

  public EmailHandler(CheckingMails email) {
    this.email = email;
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
//    respondAPI(httpExchange, JSON.toString(new String[2]).getBytes());
    respondAPI(httpExchange, "[{\"sender\": \"test@java.server\",\"subject\": \"Java Server Test\",\"content\": \"java server test content\"}]".getBytes());
  }
}
