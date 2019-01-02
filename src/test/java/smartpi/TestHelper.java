package smartpi;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import org.mortbay.util.ajax.JSON;

/**
 * @version %I%
 * @since 2019-01-02
 * @since 1.8
 */
public class TestHelper {

  public static Object readJSON(String filepath) throws IOException {
    BufferedReader reader = new BufferedReader(new FileReader(new File(filepath)));
    return JSON.parse(reader);
  }
}
