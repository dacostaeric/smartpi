import React from "react"

import SmartPiDate from "./SmartPiDate"
import Clock from "./Clock"
import Alarm from "./Alarm"

class Time extends React.Component {

  dateFormat = new Intl.DateTimeFormat("en-GB",
      {weekday: "long", month: "long", day: "numeric"});

  timeFormat = new Intl.DateTimeFormat("en-GB",
      {hour: "numeric", minute: "2-digit", hour12: true});

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
    return this.dateFormat.format(dateObject)
  }

  formatTime(dateObject) {
    return this.timeFormat.format(dateObject)
  }

  render() {
    return (<div>
      <SmartPiDate date={this.state.formattedDate}/>
      <Clock time={this.state.formattedTime}/>
      <Alarm time={this.props.alarmTime ? this.props.alarmTime : "-:-"}/>
    </div>)
  }
}

export default Time