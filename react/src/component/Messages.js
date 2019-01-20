import React from "react"

import ListHeading from "./ListHeading"
import Message from "./ListItem"

const Messages = (props) => {
  return (<div>
    <ListHeading>messages</ListHeading>
    {props.email
        ? props.email.map((email, index) => (
            <Message key={index}>{email.sender}: {email.subject}</Message>))
        : "-"}
  </div>)
};

export default Messages