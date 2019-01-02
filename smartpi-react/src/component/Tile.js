import React from "react"
import styled from "styled-components"

import theme from "../theme"

const Tile = styled.div`
float: left;
padding: 0 ${theme.tilePadding};
:not(:first-child) {
  margin-left: ${theme.tilePadding};
}
:not(:last-child) {
  margin-right: ${theme.tilePadding};
}
`;

export default Tile