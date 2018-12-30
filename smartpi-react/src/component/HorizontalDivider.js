import React from "react"
import styled from "styled-components"

import theme from "../theme"

const HorizontalDivider = styled.hr`
float: left;
width: 100%;
margin: ${theme.tilePadding} 0;
background-color: #ddd;
border: none;
height: 2px;
`;

export default HorizontalDivider