import React from "react"
import styled from "styled-components";

import TimeFormat from "../TimeFormat";
import theme from "../theme";

const Text = styled.p`
float: left;
font-size: ${theme.time.alarm.textSize};
margin: 0;
color: black;
`;

const AlarmText = (props) => {
  return (<Text>
    {props.alarm ? TimeFormat.format(
        new Date(1970, 1, 1, props.alarm.hour - 1, props.alarm.minute)) + " - "
        + props.alarm.name : "-:-"}
  </Text>)
};

export default AlarmText