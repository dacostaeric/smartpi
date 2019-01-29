package smartpi;

public class Logger {

  private static final String[] LEVELS = new String[]{"Debug", "Info", "Warning", "Error", "Fatal"};
  private static final int LEVEL = 0;

  public static void debug(String message) {
    if (LEVEL <= 0) {
      System.out.println("\u001B[32m[D] " + message + "\u001B[0m");
    }
  }

  public static void info(String message) {
    if (LEVEL <= 1) {
      System.out.println("[I] " + message);
    }
  }

  public static void warn(String message) {
    if (LEVEL <= 2) {
      System.out.println("\u001B[33m[W] " + message + "\u001B[0m");
    }
  }

  public static void error(String message) {
    if (LEVEL <= 3) {
      System.out.println("\u001B[31m[E] " + message + "\u001B[0m");
    }
  }

  public static void fatal(String message) {
    if (LEVEL <= 4) {
      System.out.println("\u001B[37m[F] " + message + "\u001B[0m");
    }
  }

  public static void main(String[] args) {
    debug("debug");
    info("info");
    warn("warn");
    error("error");
    fatal("fatal");
  }
}
