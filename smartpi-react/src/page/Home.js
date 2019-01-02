import React from "react"
import {Link} from "react-router-dom"

import TopBar from "../component/TopBar"
import BottomBar from "../component/BottomBar"
import JustifySmall from "../component/JustifySmall"
import JustifyLarge from "../component/JustifyLarge"
import Tile from "../component/Tile"
import Time from "../component/Time";
import Weather from "../component/Weather";
import MockupUnderlay from "../component/MockupUnderlay"
import ShoppingList from "../component/ShoppingList";
import HorizontalDivider from "../component/HorizontalDivider";
import Events from "../component/Events";
import Messages from "../component/Messages";

const Home = (props) => {
  return (<div>
    {false ? <MockupUnderlay/> : ""}
    <TopBar>
      <JustifySmall>
        <Tile>
          <Time/>
        </Tile>
      </JustifySmall>
      <JustifyLarge>
        <Link to={"/weather"}>
          <Tile>
            <Weather weather={props.weather} sensor={props.sensor}/>
          </Tile>
        </Link>
        <Link to={"/shopping"}>
          <Tile>
            <ShoppingList
                list={props.shop}/>
          </Tile>
        </Link>
      </JustifyLarge>
    </TopBar>
    <HorizontalDivider/>
    <BottomBar>
      <JustifySmall>
        <Link to={"/calendar"}>
          <Tile>
            <Events calendar={props.calendar}/>
          </Tile>
        </Link>
      </JustifySmall>
      <JustifyLarge>
        <Link to={"/messages"}>
          <Tile>
            <Messages email={props.email}/>
          </Tile>
        </Link>
      </JustifyLarge>
    </BottomBar>
  </div>)
};

export default Home
