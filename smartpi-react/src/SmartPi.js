import React from "react";
import styled from "styled-components"

import TopBar from "./component/TopBar"
import BottomBar from "./component/BottomBar"
import JustifySmall from "./component/JustifySmall"
import JustifyLarge from "./component/JustifyLarge"
import Tile from "./component/Tile"
import Time from "./component/Time";
import Weather from "./component/Weather";
import MockupUnderlay from "./component/MockupUnderlay"
import ShoppingList from "./component/ShoppingList";
import HorizontalDivider from "./component/HorizontalDivider";

const Container = styled.div`
box-sizing: border-box;
position: fixed;
padding: 20px;
height: 100vh;
width: 100vw;
`;

export default class SmartPi extends React.Component {

  render() {
    return (<Container>
      <MockupUnderlay/>
      <TopBar>
        <JustifySmall>
          <Tile>
            <Time/>
          </Tile>
        </JustifySmall>
        <JustifyLarge>
          <Tile>
            <Weather temperature={14} text={"cloudy"}
                     sensor={{temperature: 24, humidity: 81}}/>
          </Tile>
          <Tile>
            <ShoppingList list={["item1", "item2", "item3", "item4", "item5"]}/>
          </Tile>
        </JustifyLarge>
      </TopBar>
      <HorizontalDivider/>
      <BottomBar>
      </BottomBar>
    </Container>)
  }
}