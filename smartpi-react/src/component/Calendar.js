import React from "react"
import styled from "styled-components"

import theme from "../theme"

const Heading = styled.div`
font-size: ${theme.calendar.size.heading};
margin-bottom: ${theme.calendar.headingMargin};
font-style: italic;
`;

const Event = styled.div`
font-size: ${theme.calendar.size.event};
margin-bottom: ${theme.calendar.eventMargin};
`;

const Calendar = (props) => {
  return (<div>
    <Heading>today</Heading>
    {props.events.map((event, index) => (<Event key={index}>{event.date} - {event.title}</Event>))}
  </div>)
};

export default Calendar