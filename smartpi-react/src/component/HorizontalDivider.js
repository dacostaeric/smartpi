import React from "react"
import styled from "styled-components"

import theme from "../theme"

const HorizontalDivider = styled.hr`
float: left;
height: ${theme.dividerHeight};
width: 100%;
margin: ${theme.tilePadding} 0;
background-color: #ddd;
border: none;
`;

export default HorizontalDivider