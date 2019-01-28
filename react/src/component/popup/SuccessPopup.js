import React from "react"

import Popup from "./Popup"

const SuccessPopup = props => {
  return <Popup backgroundColor={"#ff99ff"} bottom={"0"}>{props.children}</Popup>
};

export default SuccessPopup