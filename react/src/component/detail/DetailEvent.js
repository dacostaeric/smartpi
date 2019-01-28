import React from "react"

import DetailItemHeading from "./DetailItemHeading"
import DetailItemText from "./DetailItemText"

import {formatEventDate} from "../../DateTimeFormat";

const DetailEvent = props => {
  return <div>
    <DetailItemHeading>
      {props.event && props.event.title
          ? props.event.title
          : "-"}
    </DetailItemHeading>
    <DetailItemText>
      {props.event && props.event.date && props.event.title
          ? formatEventDate(props.event.date)
          : "-"}
    </DetailItemText>
  </div>
};

export default DetailEvent