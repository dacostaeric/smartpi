package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import smartpi.server.Server;

public class IndexHandler extends SmartPiHandler implements HttpHandler {

  private byte[] index;

  public IndexHandler(String filePath) throws IOException {
    index = Files.readAllBytes(Paths.get(filePath));
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
    String requestedPath = httpExchange.getRequestURI().toString();
    switch (requestedPath) {
      case "/":
        respond(httpExchange, index);
        break;
      default:
        respond(httpExchange, Files.readAllBytes(Paths.get(Server.BASE_PATH + requestedPath)));
    }
  }
}
