import React from "react"
import styled from "styled-components"

import ListHeading from "./ListHeading"
import ListItem from "./ListItem"

import theme from "../theme"

const List = styled.div`
margin-left: ${theme.shopping.marginLeft}
`;

const ShoppingList = (props) => {
  return (<List>
    <ListHeading>shop</ListHeading>
    {props.list
        ? props.list.map((item, index) => (<ListItem key={index}>{item}</ListItem>))
        : "-"}
  </List>)
};

export default ShoppingList