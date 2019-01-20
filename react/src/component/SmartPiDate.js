import React from "react"
import styled from "styled-components"

import theme from "../theme"

const Text = styled.div`
font-size: ${theme.time.dateTextSize};
`;

const SmartPiDate = (props) => {
  return <Text>{props.date ? props.date : "-"}</Text>
};

export default SmartPiDate