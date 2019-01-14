import React from "react"

import ListHeading from "./ListHeading"
import Event from "./ListItem"

import settings from "../settings"

const timeFormat = new Intl.DateTimeFormat("en-GB",
    {hour: settings.time.hour12 ? "numeric" : "2-digit", minute: "2-digit",
      hour12: settings.time.hour12, timeZone: settings.time.timeZone});

const Events = props => {
  return (<div>
    <ListHeading>today</ListHeading>
    {props.today
        ? props.today.map((event, index) => (
            <Event key={index}>
              {timeFormat.format(event.date)} - {event.title}
            </Event>))
        : "-"}
  </div>)
};

export default Events