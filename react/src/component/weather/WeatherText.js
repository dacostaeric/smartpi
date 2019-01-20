import React from "react"
import styled from "styled-components"
import theme from "../../theme"

const Text = styled.div`
font-size: ${theme.weather.weatherTextSize};
`;

const WeatherText = (props) => {
  return <Text>${props.text ? props.text : "-"}</Text>
};

export default WeatherText