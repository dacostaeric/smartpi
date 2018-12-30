const scale = 1.1;
const unit = "vw";

const size = {
  large: scale * 7 + unit,
  sub: scale * 3 + unit,
  medium: scale * 2 + unit,
  small: scale * 1.5 + unit
};

const theme = {
  fontFamily: "Segoe UI",
  topRowHeight: scale * 40 + unit,
  bottomRowHeight: scale * 60 + unit,
  smallWidth: scale * 34 + unit,
  largeWidth: scale * 66 + unit,
  tilePadding: scale * 1 + unit + " " + scale * 2 + unit,
  time: {
    dateTextSize: scale * 2 + unit,
    clockSize: scale * 7 + unit,
    clockMargin: scale * 1 + unit,
    alarmSize: scale * 1.5 + unit
  },
  weather: {
    iconHeight: scale * 10 + unit,
    temperatureSize: size.large,
    weatherTextSize: size.sub,
    sensorTextSize: size.small,
    sensorTextMargin: scale * 0 + unit
  },
  shopping: {
    marginLeft: scale * 2 + unit,
    size: {
      heading: size.medium,
      item: size.small
    },
    headingMargin: scale * .5 + unit,
    itemMargin: scale * .15 + unit
  },
  calendar: {
    size: {
      heading: size.medium,
      event: size.small
    },
    headingMargin: scale * .5 + unit,
    eventMargin: scale * .15 + unit
  }
};

export default theme;