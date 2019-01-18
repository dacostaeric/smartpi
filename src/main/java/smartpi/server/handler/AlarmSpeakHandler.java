package smartpi.server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import smartpi.SmartPiTTS;

public class AlarmSpeakHandler extends SmartPiHandler implements HttpHandler {

  SmartPiTTS speak;

  public AlarmSpeakHandler(SmartPiTTS speak) {
    this.speak = speak;
  }

  @Override
  public void handle(HttpExchange httpExchange) throws IOException {
    respondAPI(httpExchange, ("{\"speak\":" + speak.speakAlarm() + "}").getBytes());
  }
}
