import React from "react"
import styled from "styled-components"

import theme from "../theme";

const ListItem = styled.div`
font-size: ${theme.list.size.item};
margin-bottom: ${theme.list.margin.item};
float: left;
clear: left;
`;

export default ListItem