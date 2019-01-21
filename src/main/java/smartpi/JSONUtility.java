package smartpi;

import java.util.Map;
import java.util.Map.Entry;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

public class JSONUtility {

  public static JSONObject parse(String string) throws JSONException {
    return new JSONObject(new JSONTokener(string));
  }

  public static boolean validateAllInteger(Map<String,Object> map) {
    for(Entry<String, Object> entry : map.entrySet()) {
      if(!(entry.getValue() instanceof Integer)) {
        return false;
      }
    }
    return true;
  }
}
