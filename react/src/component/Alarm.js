import React from "react"
import styled from "styled-components"
import alarmIcon from "../graphics/alarm_clock.svg"

import theme from "../theme"

const Icon = styled.img`
height: ${theme.time.alarm.iconSize};
float: left;
clear: none;
opacity: .8;
`;

const Text = styled.div`
float: left;
font-size: ${theme.time.alarm.textSize};
margin-left: ${theme.time.alarm.textMargin};
`;

const Alarm = (props) => {
  return (<div>
    <Icon src={alarmIcon}/>
    <Text>{props.time ? props.time : "-:-"}</Text>
  </div>)
};

export default Alarm