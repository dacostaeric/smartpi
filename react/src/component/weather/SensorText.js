import React from "react"
import styled from "styled-components"
import theme from "../../theme"

const Text = styled.div`
font-size: ${theme.weather.weatherTextSize};
`;

const SensorText = (props) => {
  return (<Text>{props.temperature ? props.temperature + "&degree;C" : ""
  + props.temperature && props.humidity ? " - " : ""
  + props.humidity ? props.humidity + "% humidity" : ""
  + props.temperature || props.humidity ? "indoors" : "no sensor data"}</Text>)
};

export default SensorText