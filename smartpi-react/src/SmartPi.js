import React from "react";
import styled from "styled-components"

import TopBar from "./component/TopBar"
import BottomBar from "./component/BottomBar"
import JustifySmall from "./component/JustifySmall"
import JustifyLarge from "./component/JustifyLarge"
import Time from "./component/Time";
import Weather from "./component/Weather";

const Container = styled.div`
position: fixed
padding: 20px;
height: 100vh;
width: 100vw;
box-sizing: border-box:
`;

export default class SmartPi extends React.Component {

  render() {
    return (<Container>
      <TopBar>
        <JustifySmall>
          <Time/>
        </JustifySmall>
        <JustifyLarge>
          <Weather temperature={14} text={"cloudy"}
                   sensor={{temperature: 24, humidity: 81}}/>
        </JustifyLarge>
      </TopBar>
      <BottomBar>
      </BottomBar>
    </Container>)
  }
}