package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.net.UnknownHostException;
import org.mortbay.util.ajax.JSON;
import smartpi.CheckingMails;

public class EmailHandler extends SmartPiHandler implements HttpHandler {

  CheckingMails email;

  public EmailHandler(CheckingMails email) {
    this.email = email;
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
    try {
      respondAPI(httpExchange, JSON.toString(email.getMailsAsArrayList()).getBytes());
    } catch (UnknownHostException e) {
      respondError(httpExchange, e.getMessage().getBytes());
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
