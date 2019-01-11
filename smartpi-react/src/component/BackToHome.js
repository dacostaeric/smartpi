import React from "react"
import {Link} from "react-router-dom"
import styled from "styled-components"

import theme from "../theme"

import icon from "../graphics/return.png"

const Wrapper = styled.div`
float: left;
margin-right: 1vw;
`;

const Icon = styled.img`
height: 3vw;
`;

const BackToHome = props => {
  return (<Wrapper>
    <Link to={"/"}>
      <Icon src={icon}/>
    </Link>
  </Wrapper>)
};

export default BackToHome;