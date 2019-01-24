import settings from "./settings";

const TimeFormat = new Intl.DateTimeFormat("en-GB",
    {
      hour: settings.time.hour12 ? "numeric" : "2-digit", 
      minute: "2-digit",
      hour12: settings.time.hour12,
      timeZone: settings.time.timeZone
    });

export default TimeFormat