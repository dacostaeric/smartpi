import React from "react"

import Screen from "../Screen";
import PageTitle from "../PageTitle";
import Scroll from "../Scroll";

const DetailPage = props => {
  return (<Screen>
    <PageTitle>{props.title ? props.title : "page title"}</PageTitle>
    <Scroll>{props.children}</Scroll>
  </Screen>)
};

export default DetailPage