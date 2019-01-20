import React from "react"
import styled from "styled-components"

import BackToHome from "./BackToHome";

import theme from "../theme"

const Wrapper = styled.div`
display: flex;
align-items: center;
`;

const Heading = styled.h1`
float: left;
font-size: ${theme.page.size.heading};
margin: 0;
`;

const PageTitle = props => {
  return <Wrapper><BackToHome/><Heading>{props.children}</Heading></Wrapper>
};

export default PageTitle