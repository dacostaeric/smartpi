import React from "react"
import styled from "styled-components"

import theme from "../theme"

const List = styled.div`
margin-left: ${theme.shopping.marginLeft}
`;

const Heading = styled.div`
font-size: ${theme.shopping.size.heading};
margin-bottom: ${theme.shopping.headingMargin};
font-style: italic;
`;

const Item = styled.div`
font-size: ${theme.shopping.size.item};
margin-bottom: ${theme.shopping.itemMargin};
`;

const ShoppingList = (props) => {
  return (<List>
    <Heading>shop</Heading>
    {props.list
        ? props.list.map((item, index) => (<Item key={index}>{item}</Item>))
        : "-"}
  </List>)
};

export default ShoppingList