package smartpi;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Properties;
import java.util.Scanner;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Store;

public class CheckingMails {
  private ArrayList<Map<String, String>> mails = new ArrayList<>();

  public ArrayList<Map<String, String>> check(String host, String user,
      String password) throws IOException, MessagingException {

    mails.clear();
//    try {

    Properties props = System.getProperties();
    props.setProperty("mail.store.protocol", "imaps");

    Session session = Session.getDefaultInstance(props, null);

    Store store = session.getStore("imaps");

    store.connect(host, user, password);

    Folder emailFolder = store.getFolder("INBOX");
    emailFolder.open(Folder.READ_ONLY);

    Message[] messages = emailFolder.getMessages();
    System.out.println("You have " + messages.length + " messages.");
    //Map<String, String>[] maps = new HashMap[messages.length];
    for (int i = 0, n = messages.length; i < n; i++) {
      Message message = messages[i];
      System.out.println(" ");
      System.out.println("Email Number " + (i + 1));
      System.out.println("Subject: " + message.getSubject());
      System.out.println("From: " + message.getFrom()[0]);
      System.out.println("Text: " + message.getContent().toString());
      mails.add(ReactInterface.makeEmail(message.getFrom()[0].toString(), message.getSubject(),
          message.getContent().toString()));
    }
    //close the store and folder objects
    emailFolder.close(false);
    store.close();
//    } catch (Exception e) {
//      e.printStackTrace();
//    }
    return mails;
  }

  public ArrayList<Map<String, String>> getAlreadyLoadedMails() {
    return mails;
  }

  public ArrayList<Map<String, String>> getNewMails() throws IOException, MessagingException{
    String[] credentials = new String[2];
    int i = 0;
    //try {
      Scanner scanner = new Scanner(new File("credentials.txt"));
      while (scanner.hasNext()) {
        String[] tokens = scanner.nextLine().split(" ");
        credentials[i++] = tokens[tokens.length - 1];
      }
   // } catch (FileNotFoundException e) {
   ////  }
    //System.out.println(credentials[0]);
    //System.out.println(credentials[1]);
    String host = "imap.gmail.com";
    String username = credentials[0];
    String password = credentials[1];

    return check(host, username, password);
  }

  @Deprecated
  public void run() {
    while (true) {
      //runOnce();
      try {
        Thread.sleep(SmartPiMain.FREQUENCY_MAIL_MS);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }
}