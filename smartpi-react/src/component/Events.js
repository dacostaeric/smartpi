import React from "react"
import styled from "styled-components"

import theme from "../theme"
import settings from "../settings"

const Heading = styled.div`
font-size: ${theme.calendar.size.heading};
margin-bottom: ${theme.calendar.headingMargin};
font-style: italic;
`;

const Event = styled.div`
font-size: ${theme.calendar.size.event};
margin-bottom: ${theme.calendar.eventMargin};
`;

const timeFormat = new Intl.DateTimeFormat("en-GB",
    {hour: settings.time.hour12 ? "numeric" : "2-digit", minute: "2-digit",
      hour12: settings.time.hour12, timeZone: settings.time.timeZone});

const Events = props => {
  return (<div>
    <Heading>today</Heading>
    {props.today
        ? props.today.map((event, index) => (
            <Event key={index}>
              {timeFormat.format(event.date)} - {event.title}
            </Event>))
        : "-"}
  </div>)
};

export default Events