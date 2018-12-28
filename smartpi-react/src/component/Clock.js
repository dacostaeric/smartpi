import React from "react"
import styled from "styled-components"
import theme from "../theme"

const StyledClock = styled.div`
font-family: ${theme.fontFamily}, sans-serif;
font-size: 50px;
`;

const Clock = (props) => {
  return <StyledClock>{props.time ? props.time : "--:--"}</StyledClock>
};

export default Clock