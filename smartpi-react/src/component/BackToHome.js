import React from "react"
import {Link} from "react-router-dom"
import styled from "styled-components"

import theme from "../theme"

import icon from "../graphics/weather/clear.svg"

const Wrapper = styled.div`
float: left;
`;

const Icon = styled.img`
height: 50px;
`;

const BackToHome = props => {
  return (<Wrapper>
    <Link to={"/"}>
      <Icon src={icon}/>
    </Link>
  </Wrapper>)
};

export default BackToHome;