import React from "react"

import Popup from "./Popup"
import RemoveButton from "../RemoveButton"
import PopupHeading from "./PopupHeading"
import PopupForm from "./PopupForm"
import TransparentInput from "../TransparentInput"
import Button from "../Button"

export default class AddAlarmPopup extends React.Component {

  state = {
    name: undefined,
    hour: undefined,
    minute: undefined
  };

  submit(event) {
    event.preventDefault();
    let hour = parseInt(this.state.hour);
    let minute = parseInt(this.state.minute);
    if (this.state.name !== undefined && this.state.hour !== undefined
        && this.state.minute !== undefined
        && 0 <= hour && hour <= 23 && 0 <= minute && minute <= 59) {
      this.props.addAlarm({
        name: this.state.name,
        hour,
        minute
      });
    } else {
      console.log("undefined")
    }
  }

  render() {
    return (<Popup backgroundColor={"orange"} top={"0"}>
      <RemoveButton onClick={this.props.closePopup}>x</RemoveButton>
      <PopupHeading>add alarm</PopupHeading>
      <PopupForm>
        <TransparentInput type={"text"} name={"name"} placeholder={"name"}
                          required={true} onChange={e => this.setState(
            {name: e.target.value})} width={"15vw"}/>
        <TransparentInput type={"number"} name={"hour"} placeholder={"00"}
                          required={true} onChange={e => this.setState(
            {hour: e.target.value})} min={0} max={23} width={"4vw"}
                          textAlign={"right"}/>
        <span>:</span>
        <TransparentInput type={"number"} name={"minute"} placeholder={"00"}
                          required={true} onChange={e => this.setState(
            {minute: e.target.value})} min={0} max={59} width={"5vw"}/>
        <Button onClick={this.submit.bind(this)}>add</Button>
      </PopupForm>
    </Popup>)
  }
}