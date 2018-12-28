import React from "react"

const SmartPiDate = (props) => {
  return <div>{props.date ? props.date : "-"}</div>
};

export default SmartPiDate