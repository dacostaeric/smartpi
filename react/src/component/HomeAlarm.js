import React from "react"
import {Link} from "react-router-dom";
import styled from "styled-components"

import SmallIcon from "./SmallIcon"
import AlarmText from "./AlarmText";

import alarmIcon from "../graphics/alarm_clock.svg"

import theme from "../theme"

const Button = styled.button`
height: 4vw;
width: 5vw;
font-size: 2vw;
margin-left: ${theme.time.alarm.textMargin};
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
`;

const HomeAlarm = (props) => {
  return (<Wrapper>
    <Link to={"/alarm"}>
      <SmallIcon src={alarmIcon}/>
      <AlarmText alarm={props.alarm}/>
    </Link>
    <Button onClick={props.showAlarmPopup}>+</Button>
  </Wrapper>)
};

export default HomeAlarm