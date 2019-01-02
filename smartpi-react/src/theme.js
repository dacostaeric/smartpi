const scale = 1.2;
const unit = "vw";

const size = {
  large: scale * 7,
  sub: scale * 3,
  medium: scale * 2,
  small: scale * 1.5
};

const theme = {
  fontFamily: "Segoe UI",
  topRowHeight: scale * 40 + unit,
  bottomRowHeight: scale * 60 + unit,
  smallWidth: scale * 40 + unit,
  largeWidth: scale * 60 + unit,
  containerPadding: scale * 3 + unit,
  tilePadding: scale * 2 + unit,
  time: {
    dateTextSize: scale * 2 + unit,
    clockSize: scale * 7 + unit,
    clockMarginTop: scale * 2 + unit,
    clockMarginBottom: scale * .5 + unit,
    alarmSize: scale * 1.5 + unit
  },
  weather: {
    margin: scale * 1 + unit,
    iconHeight: scale * 10 + unit,
    temperatureSize: size.large + unit,
    weatherTextSize: size.sub + unit,
    sensorTextSize: size.small + unit,
    sensorTextMargin: scale * 0 + unit
  },
  shopping: {
    marginLeft: scale * 2 + unit,
    size: {
      heading: size.medium + unit,
      item: size.small + unit
    },
    headingMargin: scale * .5 + unit,
    itemMargin: scale * .15 + unit
  },
  calendar: {
    size: {
      heading: size.medium + unit,
      event: size.small + unit
    },
    headingMargin: scale * .5 + unit,
    eventMargin: scale * .15 + unit
  }
};

export default theme;