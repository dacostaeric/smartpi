import React from "react"
import styled from "styled-components"

import theme from "../theme"

const TransparentInput = styled.input`
display: inline;
background: none;
color: black;
border: none;
padding: none;
font-size: ${theme.size.medium};
font-family: ${theme.fontFamily};
-webkit-appearance: none;
appearance: textfield;
text-align: ${props => props.textAlign ? props.textAlign : "left"};
width: ${props => props.width ? props.width : "10vw"};
padding: 0;
`;

export default TransparentInput