import React from "react"
import styled from "styled-components"
import theme from "../../theme"

const Text = styled.div`
font-size: ${theme.weather.temperatureSize};
`;

const WeatherTemperature = (props) => {
  return <Text>{props.temperature ? props.temperature
      : "-"} &degree;C</Text>
};

export default WeatherTemperature