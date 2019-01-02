import React from "react"
import styled from "styled-components"

import mockup from "../graphics/mockup.png"

const MockupUnderlayImage = styled.img`
position: fixed;
width: 100vw;
opacity: .1;
z-index: -1;
`;

const MockupUnderlay = (props) => {
  return <MockupUnderlayImage src={mockup}/>
};

export default MockupUnderlay