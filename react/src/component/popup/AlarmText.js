import React from "react"
import styled from "styled-components";

import TimeFormat from "../../TimeFormat";
import theme from "../../theme";

const Text = styled.p`
font-size: ${theme.size.large};
color: black;
margin: 0 0 2vw;
`;

const AlarmText = (props) => {
  return (<Text>
    {props.alarm ? TimeFormat.format(
        new Date(1970, 1, 1, props.alarm.hour - 1, props.alarm.minute)) + " - "
        + props.alarm.name : "-:-"}
  </Text>)
};

export default AlarmText