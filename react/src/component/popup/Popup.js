import React from "react"
import styled from "styled-components"

import theme from "../../theme"

const Popup = styled.div`
position: fixed;
display: flex;
flex-direction: column;
justify-content: center;
justify-items: center;
align-content: center;
align-items: center;
${props => props.top ? "top: " + props.top + ";" : ""}
${props => props.bottom ? "bottom: " + props.bottom + ";" : ""}
left: 0;
${props => props.height ? props.height + ";" : ""}
box-sizing: border-box;
max-height: 100vh;
width: 100vw;
max-width: 100vw;
padding: ${theme.containerPadding};
background-color: ${props => props.backgroundColor ? props.backgroundColor : "white"};
z-index: 10000;
font-size: ${theme.size.medium};
`;

export default Popup