package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import smartpi.JSONUtility;

public class AlarmHandler extends SmartPiHandler implements HttpHandler {

  private List<Map<String, Object>> alarms = new ArrayList<>();

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
    switch (httpExchange.getRequestURI().getPath()) {
      case "/api/alarm/add":
        String query = httpExchange.getRequestURI().getQuery();
        try {
          JSONObject jsonObject = JSONUtility.parse(query);
          Map<String, Object> jsonMap = jsonObject.toMap();
          if (!validateFormat(jsonMap)) {
            throw new JSONException("Invalid JSON.");
          }
          alarms.add(jsonMap);
          respondAPI(httpExchange, ("{\"success\":true,\"alarm\":" + jsonObject + "}").getBytes());
        } catch (JSONException e) {
          respondAPI(httpExchange,
              ("{\"success\":false,\"message\":\"" + e.getMessage() + "\",\"query\":\"" + query
                  + "\"}").getBytes());
        }
        break;
      case "/api/alarm/remove":
        String remove = httpExchange.getRequestURI().getQuery();
        for(Map<String,Object> alarm : alarms) {
          if(alarm.get("name").equals(remove)) {
            alarms.remove(alarm);
            break;
          }
        }
        respondAPI(httpExchange, "{\"success\":true}".getBytes());
        break;
      default:
        respondAPI(httpExchange, new JSONArray(alarms).toString().getBytes());
    }
  }

  private boolean validateFormat(Map<String, Object> map) {
    return map.get("name") != null && map.get("hour") != null && map.get("minute") != null
        && map.get("name") instanceof String && map.get("hour") instanceof Integer && map
        .get("minute") instanceof Integer;
  }
}
