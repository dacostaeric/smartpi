import React from "react"
import styled from "styled-components"

import theme from "../theme"

import logo from "../graphics/logo.svg"

const Wrapper = styled.div`
position: fixed;
display: flex;
flex-direction: column;
align-content: center;
align-items: center;
justify-content: center;
justify-items: center;
height: 100vh;
width: 100vw;
background-color: white;
z-index: 10000;
`;

const Logo = styled.img`
width: 30vw;
max-height: 80vw;
`;

const Text = styled.p`
font-size: ${theme.size.large};
margin: 0 0 10vw;
`;

const Splash = props => {
  return <Wrapper>
    <Logo src={logo}/>
    <Text>SmartPi</Text>
  </Wrapper>
};

export default Splash