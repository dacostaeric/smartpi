package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.mortbay.util.ajax.JSON;

/**
 * @version %I%
 * @since 2019-01-20
 * @since 1.8
 */
public class ShoppingListHandler extends SmartPiHandler implements HttpHandler {

  List<String> shoppingList = new ArrayList<>();

  @Override
  public synchronized void handle(HttpExchange httpExchange) throws IOException {
    switch (httpExchange.getRequestURI().getPath()) {
      case "/api/shop/add":
        String query = httpExchange.getRequestURI().getQuery();
        shoppingList.add(query);
        respondAPI(httpExchange, ("{\"success\":true,\"query\":\"" + query + "\"}").getBytes());
        break;
      default:
        respondAPI(httpExchange, JSON.toString(shoppingList).getBytes());
    }
  }
}
