import React from "react"

import Popup from "./Popup"

const ErrorPopup = (props) => {
  return <Popup backgroundColor={"#00ffff"} bottom={"0"}>{props.children}</Popup>
};

export default ErrorPopup