import React from "react"
import styled from "styled-components"

import theme from "../theme";

const ListHeading = styled.div`
font-size: ${theme.list.size.heading};
margin-bottom: ${theme.list.margin.heading};
font-style: italic;
float: left;
clear: both;
`;

export default ListHeading