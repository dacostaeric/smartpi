import React from "react"
import styled from "styled-components"
import theme from "../theme"

import weatherIconImage from "../graphics/icon_partly-cloudy.png"

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

const Weather = (props) => {
  return (<div>
    <div>
      <WeatherIcon src={weatherIconImage}/>
      <WeatherTextWrapper>
        <WeatherText>
          {props.text ? props.text : "-"}
        </WeatherText>
        <WeatherTemperature>
          {props.temperature ? props.temperature : "-"}&#8451;
        </WeatherTemperature>
      </WeatherTextWrapper>
    </div>
    <SensorText>
      {(props.sensor.temperature ? props.sensor.temperature + "\u2103" : "")
      + (props.sensor.temperature && props.sensor.humidity ? " - " : "")
      + (props.sensor.humidity ? props.sensor.humidity + "% humidity" : "")
      + (props.sensor.temperature || props.sensor.humidity ? " indoors"
          : "no sensor data")}
    </SensorText>
  </div>)
};

export default Weather