import React from "react"
import styled from "styled-components"
import alarmIcon from "../graphics/icon_alarm-clock.png"

const Icon = styled.img`
height: 2vw;
float: left;
clear: none;
margin-right: 5px;
opacity: .3;
`;

const Alarm = (props) => {
  return (<div>
    <Icon src={alarmIcon}/>
    <div>{props.time ? props.time : "-:-"}</div>
  </div>)
};

export default Alarm