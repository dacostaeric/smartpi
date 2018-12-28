import React from "react"
import styled from "styled-components"
import theme from "../theme"

const WeatherIcon = styled.img`
height: ${theme.weather.iconHeight};
`;

const WeatherTemperature = styled.div`
font-size: ${theme.weather.temperatureSize};
`;

const WeatherText = styled.div`
font-size: ${theme.weather.weatherTextSize};
`;

const SensorText = styled.div`
font-size: ${theme.weather.weatherTextSize};
`;

const Weather = (props) => {
  return (<div>
    <div>
      <WeatherIcon/>
      <div>
        <WeatherTemperature>
          {props.temperature ? props.temperature : "-"}&#8451;
        </WeatherTemperature>
        <WeatherText>
          {props.text ? props.text : "-"}
        </WeatherText>
      </div>
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