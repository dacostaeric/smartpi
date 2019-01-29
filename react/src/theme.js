const scale = 1.2;
const unit = "vw";

const size = {
  massive: scale * 7,
  large: scale * 4,
  sub: scale * 3,
  medium: scale * 2,
  small: scale * 1.5
};

const theme = {
  fontFamily: "Segoe UI, Lato, sans-serif",
  invert: true,
  smallWidth: 45 + unit,
  largeWidth: 55 + unit,
  containerPadding: scale * 3 + unit,
  tilePadding: scale * 2 + unit,
  dividerHeight: scale * .2 + unit,
  size: {
    massive: size.massive + unit,
    large: size.large + unit,
    sub: size.sub + unit,
    medium: size.medium + unit,
    small: size.small + unit
  },
  page: {
    size: {
      heading: size.large + unit,
    }
  },
  list: {
    size: {
      heading: size.medium + unit,
      item: size.small + unit
    },
    margin: {
      heading: scale * .5 + unit,
      item: scale * .15 + unit
    }
  },
  time: {
    dateTextSize: scale * 2 + unit,
    clockSize: scale * 7 + unit,
    clockMarginTop: scale * .7 + unit,
    clockMarginBottom: scale * .2 + unit,
    alarm: {
      iconSize: scale * 2 + unit,
      textSize: scale * 1.5 + unit,
      textMargin: scale * 1 + unit,

    }
  },
  alarms: {
    alarm: {
      size: {
        heading: size.medium + unit,
        text: size.small + unit
      }
    }
  },
  weather: {
    margin: scale * 1 + unit,
    iconHeight: scale * 10 + unit,
    temperatureSize: size.massive + unit,
    weatherTextSize: size.sub + unit,
    sensorTextSize: size.small + unit,
    sensorTextMargin: scale * 0 + unit
  },
  shopping: {
    marginLeft: scale * 2 + unit
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