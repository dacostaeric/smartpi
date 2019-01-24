import React from "react"
import {Link} from "react-router-dom"

import SmartPiDate from "./SmartPiDate"
import Clock from "./Clock"
import HomeAlarm from "./HomeAlarm"

import settings from "../settings"

class Time extends React.Component {

  dateFormat = new Intl.DateTimeFormat("en-GB",
      {weekday: "long", month: "long", day: "numeric", formatMatcher: "basic"});

  timeFormat = new Intl.DateTimeFormat("en-GB",
      {
        hour: settings.time.hour12 ? "numeric" : "2-digit", minute: "2-digit",
        hour12: settings.time.hour12, timeZone: settings.time.timeZone
      });

  state = {
    date: new Date(0),
    formattedDate: "-",
    formattedTime: "--:--"
  };

  componentDidMount() {
    this.refreshState(new Date());
    setInterval(() => {
      this.refreshState(new Date())
    }, 1000)
  }

  refreshState(date) {
    if (this.state.date.getHours() !== date.getHours()
        || this.state.date.getMinutes() !== date.getMinutes()) {
      this.setTimeState(this.formatTime(date))
    }
    if (this.state.date.getDate() !== date.getDate()) {
      this.setDateState(this.formatDate(date))
    }
    this.setState({date});
  }

  setDateState(formattedDate) {
    this.setState({formattedDate})
  }

  setTimeState(formattedTime) {
    this.setState({formattedTime})
  }

  formatDate(dateObject) {
    let split = this.dateFormat.format(dateObject).split(" ");
    return (split[0] + ", " + split[2] + " " + split[1]).toLowerCase()
  }

  formatTime(dateObject) {
    return this.timeFormat.format(dateObject)
  }

  formatAlarmTime(alarm) {
    return this.formatTime(new Date(1970, 1, 1, alarm.hour - 1, alarm.minute))
        + " - " + alarm.name;
  }

  render() {
    return (<div>
      <SmartPiDate date={this.state.formattedDate}/>
      <Clock time={this.state.formattedTime}/>
      <Link to={"/alarm"}>
        <HomeAlarm alarm={this.props.alarm}/>
      </Link>
    </div>)
  }
}

export default Time