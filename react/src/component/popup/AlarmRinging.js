import React from "react"
import styled from "styled-components"
import ReactAudioPlayer from "react-audio-player"

import theme from "../../theme"

import Popup from "./Popup";

import AlarmClock from "../../graphics/alarm_clock.svg"
import Alarm from "../../audio/alarm.mp3"
import AlarmText from "../AlarmText";

const Icon = styled.img`
height: 40%;
max-height: 30vw;
margin: auto;
`;

const AlarmRinging = props => {
  return (<Popup top={"0"} height={"100vh"}>
    <Icon src={AlarmClock}/>
    <ReactAudioPlayer src={Alarm} autoPlay={true} loop={true}/>
    <AlarmText alarm={props.alarm} fontSize={theme.size.large}/>
    <button onClick={props.dismissAlarm}>dismiss</button>
  </Popup>)
};

export default AlarmRinging