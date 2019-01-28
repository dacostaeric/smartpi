import settings from "./settings";

const TimeFormat = new Intl.DateTimeFormat("en-GB",
    {
      hour: settings.time.hour12 ? "numeric" : "2-digit",
      minute: "2-digit",
      hour12: settings.time.hour12,
      timeZone: settings.time.timeZone
    });

const DateFormat = new Intl.DateTimeFormat("en-GB",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      formatMatcher: "basic"
    });

const formatDate = date => {
  let split = DateFormat.format(date).split(" ");
  return (split[0] + ", " + split[2] + " " + split[1]).toLowerCase()
};

const formatEventDate = date => {
  return formatDate(date) + " " + TimeFormat.format(date);
};

export {
  TimeFormat,
  DateFormat,
  formatDate,
  formatEventDate
}