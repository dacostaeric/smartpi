import React from "react"
import styled from "styled-components"

import theme from "../theme"
import PageTitle from "../component/PageTitle";
import AlarmText from "../component/AlarmText";

const Alarm = (props) => {
  return (<div>
    <PageTitle>alarms</PageTitle>
    {props.alarms
        ? props.alarms.map(
            (alarm, index) => <AlarmText key={index} alarm={alarm}/>)
        : <i>No alarms set.</i>}
  </div>)
};

export default Alarm