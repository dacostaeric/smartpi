import React from "react"

import DetailItem from "./DetailItem"
import DetailItemHeading from "./DetailItemHeading"
import DetailItemText from "./DetailItemText"

const DetailEmail = props => {
  return (<DetailItem>
    <DetailItemHeading>
      {props.email && props.email.subject ? props.email.subject : "-"}
    </DetailItemHeading>
    <DetailItemText>
      {props.email && props.email.sender ? props.email.sender : "-"}
    </DetailItemText>
    <DetailItemText>
      {props.email && props.email.content ? props.email.content : "-"}
    </DetailItemText>
  </DetailItem>)
};

export default DetailEmail