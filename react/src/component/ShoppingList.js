import React from "react"
import styled from "styled-components"

import PlainLink from "./PlainLink"
import ListHeading from "./ListHeading"
import ListItem from "./ListItem"
import AddButton from "./AddButton"

import theme from "../theme"

const List = styled.div`
margin-left: ${theme.shopping.marginLeft}
`;

const ShoppingList = props => {
  return (<List>
    <PlainLink to={"/shopping"}>
      <ListHeading>shop</ListHeading>
    </PlainLink>
    <AddButton onClick={props.showShopPopup}>+</AddButton>
    {props.list
        ? props.list.map(
            (item, index) => (<ListItem key={index}>{item}</ListItem>))
        : <ListItem>-</ListItem>}
  </List>)
};

export default ShoppingList