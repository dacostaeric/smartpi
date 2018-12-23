package smartpi;

import java.util.Properties;

import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Store;

public class CheckingMails {

    public static void check(String host, String user,
                             String password)
    {
        try {

            Properties props = System.getProperties();
            props.setProperty("mail.store.protocol", "imaps");

            Session session = Session.getDefaultInstance(props, null);

            Store store = session.getStore("imaps");

            store.connect(host, user, password);

            Folder emailFolder = store.getFolder("INBOX");
            emailFolder.open(Folder.READ_ONLY);


            Message[] messages = emailFolder.getMessages();
            System.out.println("You have " + messages.length + "messages.");

            for (int i = 0, n = messages.length; i < n; i++) {
                Message message = messages[i];
                System.out.println(" ");
                System.out.println("Email Number " + (i + 1));
                System.out.println("Subject: " + message.getSubject());
                System.out.println("From: " + message.getFrom()[0]);
                System.out.println("Text: " + message.getContent().toString());

            }

            //close the store and folder objects
            emailFolder.close(false);
            store.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {

        String host = "imap.gmail.com";
        String username = "smartestpi@gmail.com";
        String password = "amazingproject";
        check(host, username, password);

    }
}