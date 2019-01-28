import React from "react"

import Popup from "./Popup"
import RemoveButton from "../RemoveButton"
import PopupHeading from "./PopupHeading"
import TransparentInput from "../TransparentInput"
import Button from "../Button"

export default class ShopPopup extends React.Component {

  state = {
    item: undefined
  };

  submit(event) {
    event.preventDefault();
    this.props.addShopItem(this.state.item)
  }

  render() {
    return (<Popup backgroundColor={"orange"} top={"0"}>
      <RemoveButton onClick={this.props.closePopup}>x</RemoveButton>
      <PopupHeading>add item</PopupHeading>
      <form>
        <TransparentInput
            onChange={event => this.setState({item: event.target.value})}
            placeholder={"item"} required={true} width={"15vw"}/>
        <Button onClick={this.submit.bind(this)}>add</Button>
      </form>
    </Popup>)
  }
}