package smartpi;

import java.io.IOException;
import java.util.HashMap;
import junit.framework.TestCase;

/**
 * @version %I%
 * @since 2019-01-01
 * @since 1.8
 */
public class TestReactInterface extends TestCase {

  public void testWriteSensorData() {
    if(!ReactInterface.writeSensorData(25, 80)) {
      fail();
    }

    try {
      Object result = TestHelper.readJSON("server/api/sensor.json");
      if(!(result instanceof HashMap)) {
        fail();
      }
      HashMap map = (HashMap) result;
      assertEquals(25d, map.get("temperature"));
      assertEquals(80d, map.get("humidity"));
    } catch (IOException e) {
      fail();
    }
  }

  public void testWriteEvents() {
    String[] titles = new String[] {"title1", "title2", "title3"};
    String[] dates = new String[] {"date1", "date2", "date3"};
    if(!ReactInterface.writeEvents(
        ReactInterface.makeEvent(titles[0], dates[0]),
        ReactInterface.makeEvent(titles[1], dates[1]),
        ReactInterface.makeEvent(titles[2], dates[2]))) {
      fail();
    }

    try {
      Object result = TestHelper.readJSON("server/api/calendar.json");
      if(!(result instanceof Object[])) {
        fail();
      }
      Object[] array = (Object[]) result;
      for(int i=0; i<array.length; i++) {
        if(!(array[i] instanceof HashMap)) {
          fail();
        }
        assertEquals(titles[i], ((HashMap) array[i]).get("title"));
        assertEquals(dates[i], ((HashMap) array[i]).get("date"));
      }
    } catch (IOException e) {
      fail();
    }
  }

  public void testWriteEmail() {
    String[] senders = new String[] {"sender1", "sender2", "sender3"};
    String[] subjects = new String[] {"subject1", "subject2", "subject3"};
    String[] contents = new String[] {"content1", "content2", "content3"};
    if(!ReactInterface.writeEvents(
        ReactInterface.makeEmail(senders[0], subjects[0], contents[0]),
        ReactInterface.makeEmail(senders[1], subjects[1], contents[1]),
        ReactInterface.makeEmail(senders[2], subjects[2], contents[2]))) {
      fail();
    }

    try {
      Object result = TestHelper.readJSON("server/api/email.json");
      if(!(result instanceof Object[])) {
        fail();
      }
      Object[] array = (Object[]) result;
      for(int i=0; i<array.length; i++) {
        if(!(array[i] instanceof HashMap)) {
          fail();
        }
        assertEquals(senders[i], ((HashMap) array[i]).get("sender"));
        assertEquals(subjects[i], ((HashMap) array[i]).get("subject"));
        assertEquals(contents[i], ((HashMap) array[i]).get("content"));
      }
    } catch (IOException e) {
      fail();
    }
  }
}
