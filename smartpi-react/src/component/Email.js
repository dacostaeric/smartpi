import React from "react"
import styled from "styled-components"

import theme from "../theme"

const Heading = styled.div`
font-size: ${theme.calendar.size.heading};
margin-bottom: ${theme.calendar.headingMargin};
font-style: italic;
`;

const Message = styled.div`
font-size: ${theme.calendar.size.event};
margin-bottom: ${theme.calendar.eventMargin};
`;

const Email = (props) => {
  return (<div>
    <Heading>messages</Heading>
    {props.email.map((email, index) => (<Message key={index}>{email.sender}: {email.subject}</Message>))}
  </div>)
};

export default Email