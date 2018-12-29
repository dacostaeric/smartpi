const scale = 1;
const unit = "vw";

const theme = {
  fontFamily: "Segoe UI",
  topRowHeight: scale * 40 + unit,
  bottomRowHeight: scale * 60 + unit,
  smallWidth: scale * 34 + unit,
  largeWidth: scale * 66 + unit,
  tilePadding: scale * 1 + unit + " " + scale * 2 + unit,
  size: {
    large: scale * 7 + unit,
    sub: scale * 3 + unit,
    small: scale * 1.5 + unit
  },
  time: {
    dateTextSize: scale * 2 + unit,
    clockSize: scale * 7 + unit,
    clockMargin: scale * 1 + unit,
    alarmSize: scale * 1.5 + unit
  },
  weather: {
    iconHeight: scale * 10 + unit,
    temperatureSize: scale * 7 + unit,
    weatherTextSize: scale * 2 + unit,
    sensorTextSize: scale * 1.5 + unit,
    sensorTextMargin: scale * 0 + unit
  },
  shopping: {
    marginLeft: scale * 2 + unit,
    size: {
      heading: scale * 2 + unit,
      item: scale * 1.5 + unit
    },
    headingMargin: scale * .5 + unit,
    itemMargin: scale * .15 + unit
  }
};

export default theme;