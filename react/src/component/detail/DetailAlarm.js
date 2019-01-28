import React from "react"
import styled from "styled-components"

import theme from "../../theme"

import TimeFormat from "../../TimeFormat"

import DetailItem from "./DetailItem"
import RemoveButton from "../RemoveButton"
import DetailItemHeading from "./DetailItemHeading"
import DetailItemText from "./DetailItemText"

const DetailAlarm = (props) => {
  return (<DetailItem>
    <RemoveButton onClick={() => props.removeAlarm(props.alarm)}>x</RemoveButton>
    <DetailItemHeading>{props.alarm ? props.alarm.name : "-"}</DetailItemHeading>
    <DetailItemText>
      {props.alarm ? TimeFormat.format(
          new Date(1970, 1, 1, props.alarm.hour - 1, props.alarm.minute))
          : "-:-"}
    </DetailItemText>
  </DetailItem>)
};

export default DetailAlarm