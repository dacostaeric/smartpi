package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.json.JSONArray;

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
        shoppingList.addAll(Arrays.asList(query.split(",")));
        respondAPI(httpExchange, ("{\"success\":true,\"query\":\"" + query + "\"}").getBytes());
        break;
      case "/api/shop/clear":
        shoppingList.clear();
        respondAPI(httpExchange, ("{\"success\":true}").getBytes());
        break;
      default:
        respondAPI(httpExchange, new JSONArray(shoppingList).toString().getBytes());
    }
  }
}
