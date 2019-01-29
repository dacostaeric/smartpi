import React from "react"
import styled from "styled-components"
import ReactAudioPlayer from "react-audio-player"

import theme from "../../theme"

import Popup from "./Popup";
import Button from "../Button"

import AlarmClock from "../../graphics/alarm_clock.svg"
import Alarm from "../../audio/alarm.mp3"
import AlarmText from "./AlarmText";

const Icon = styled.img`
height: 20%;
max-height: 30vw;
margin: auto;
`;

const AlarmRinging = props => {
  return (<Popup top={"0"} height={"100vh"}>
    <Icon src={AlarmClock}/>
    <ReactAudioPlayer src={Alarm} autoPlay={true} loop={true}/>
    <AlarmText alarm={props.alarm} fontSize={""}/>
    <Button onClick={props.dismissAlarm}>dismiss</Button>
  </Popup>)
};

export default AlarmRinging