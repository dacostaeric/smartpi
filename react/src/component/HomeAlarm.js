import React from "react"
import styled from "styled-components"
import alarmIcon from "../graphics/alarm_clock.svg"

import theme from "../theme"
import AlarmText from "./AlarmText";

const Icon = styled.img`
height: ${theme.time.alarm.iconSize};
float: left;
clear: none;
margin-right: ${theme.time.alarm.textMargin};
opacity: .8;
`;

const HomeAlarm = (props) => {
  return (<div>
    <Icon src={alarmIcon}/>
    <AlarmText alarm={props.alarm}/>
  </div>)
};

export default HomeAlarm