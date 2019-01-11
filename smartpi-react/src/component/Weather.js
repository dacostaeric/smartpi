import React from "react"
import styled from "styled-components"
import theme from "../theme"

import clear from "../graphics/weather/clear.svg"
import partlyCloudy from "../graphics/weather/partly_cloudy.svg"
import cloudCover from "../graphics/weather/cloud_cover.svg"
import rain from "../graphics/weather/rain.svg"
import thunderstorm from "../graphics/weather/thunderstorm.svg"
import snow from "../graphics/weather/snow.svg"
import fog from "../graphics/weather/fog.svg"
import none from "../graphics/weather/none.png"

const getIcon = (code) => {
  switch (code) {
    case 800:
      return clear;
    case 801:
      return partlyCloudy;
    case 802:
    case 803:
    case 804:
      return cloudCover;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 511:
    case 521:
    case 522:
    case 531:
      return rain;
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      return thunderstorm;
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      return snow;
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    default:
      //case 771:
      //case 781:
      return none;
  }
};

const WeatherIcon = styled.img`
height: ${theme.weather.iconHeight};
float: left;
`;

const WeatherTemperature = styled.div`
font-size: ${theme.weather.temperatureSize};
font-style: italic;
`;

const WeatherText = styled.div`
font-size: ${theme.weather.weatherTextSize};
`;

const SensorText = styled.div`
float: right;
font-size: ${theme.weather.sensorTextSize};
`;

const WeatherTextWrapper = styled.div`
float: left;
margin-left: ${theme.weather.margin}
`;

const ZERO_CELSIUS_IN_KELVIN = 273.15;

const Weather = (props) => {
    return (<div>
      <div>
        <WeatherIcon src={getIcon(props.weather && props.weather.weather[0].id
            ? props.weather.weather[0].id
            : "")}/>
        <WeatherTextWrapper>
          <WeatherText>
            {props.weather && props.weather.weather[0].main
                  ? props.weather.weather[0].main.toLowerCase()
                  : "-"}
          </WeatherText>
          <WeatherTemperature>
            {
              props.weather && props.weather.main.temp
                  ? Math.floor(
                  (props.weather.main.temp - ZERO_CELSIUS_IN_KELVIN))
                  : "-"
            }&#8451;
          </WeatherTemperature>
        </WeatherTextWrapper>
      </div>
      <SensorText>
        {(props.sensor && props.sensor.temperature
            ? props.sensor.temperature + "\u2103"
            : "")
        + (props.sensor && props.sensor.temperature
        && props.sensor.humidity
            ? " \u2027 "
            : "")
        + (props.sensor && props.sensor.humidity
            ? props.sensor.humidity
            + "% humidity" : "")
        + (props.sensor && (props.sensor.temperature
            || props.sensor.humidity)
            ? " indoors"
            : "-")}
      </SensorText>
    </div>)
};

// const Weather = (props) => {
//
// };

export default Weather