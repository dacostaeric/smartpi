package smartpi.server.handler;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;

abstract class SmartPiHandler {

  void respond(HttpExchange exchange, byte[] response) throws IOException {
    exchange.sendResponseHeaders(200, response.length);
    OutputStream outputStream = exchange.getResponseBody();
    outputStream.write(response);
    outputStream.close();
    exchange.close();
  }

  void respondAPI(HttpExchange exchange, byte[] response) throws IOException {
    Headers headers = exchange.getResponseHeaders();
    headers.add("Content-Type", "application/json");
    headers.add("Access-Control-Allow-Origin", "*");
    headers.add("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    headers.add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    respond(exchange, response);
  }

  void respondError(HttpExchange exchange, byte[] message) throws IOException {
    exchange.sendResponseHeaders(500, message.length);
  }
}
