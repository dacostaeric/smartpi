import React from "react";
import styled from "styled-components"
import {BrowserRouter, Route, Switch} from "react-router-dom"

import theme from "./theme"

import Home from "./page/Home"
import Weather from "./page/Weather";
import Shop from "./page/Shop";
import Calendar from "./page/Calendar"
import Email from "./page/Email"
import Alarm from "./page/Alarm";
//import APIKey from "./OpenWeatherMapAPIKey";

const API_PORT = 3001;
const API_BASE_URL = "http://" + window.location.hostname + ":" + API_PORT
    + "/api/";
const DATA_FETCH_INTERVAL_MS = 360000;
const WEATHER_FETCH_INTERVAL_MS = 900000;
const WEATHER = false;

const Container = styled.div`
box-sizing: border-box;
position: fixed;
padding: ${theme.containerPadding};
height: 100vh;
width: 100vw;
background-color: white;
${theme.invert ? "filter: invert(100%);" : ""}
`;

export default class SmartPi extends React.Component {

  state = {
    /*weather: {
      "coord": {"lon": 7.57, "lat": 47.56},
      "weather": [{
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
      }],
      "base": "stations",
      "main": {
        "temp": 277.51,
        "pressure": 1035,
        "humidity": 86,
        "temp_min": 276.15,
        "temp_max": 278.15
      },
      "visibility": 10000,
      "wind": {"speed": 1.5, "deg": 160},
      "clouds": {"all": 0},
      "dt": 1546186800,
      "sys": {
        "type": 1,
        "id": 6585,
        "message": 0.0319,
        "country": "CH",
        "sunrise": 1546154263,
        "sunset": 1546184850
      },
      "id": 2661604,
      "name": "Basel",
      "cod": 200
    },*/
    alarms: undefined,
    alarm: {
      upcoming: undefined,
      ringing: false
    },
    upcomingAlarm: undefined,
    weather: undefined,
    sensor: undefined,
    shop: undefined,
    calendar: undefined,
    today: undefined,
    email: undefined
  };

  fetchAPIData(uri, handler) {
    fetch(uri, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Response was not ok");
    }).then(json => {
      handler(json);
      return json;
    }).catch((error) => {
      console.log("Error fetching data (" + uri + "):", error)
    })
  }

  setCalendarStates(calendar) {
    let today = [];
    let now = new Date();
    let todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let tomorrowDate = new Date(todayDate.getTime() + 86400000);
    for (let event of calendar) {
      event.date = new Date(event.date);
      if (todayDate <= event.date && event.date < tomorrowDate) {
        today.push(event)
      }
    }
    this.setState({calendar, today})
  }

  setAllLocalState() {
    this.fetchAPIData(API_BASE_URL + "alarm",
        alarms => this.setState({alarms}));
    this.fetchAPIData(API_BASE_URL + "sensor",
        sensor => this.setState({sensor}));
    this.fetchAPIData(API_BASE_URL + "shop",
        shop => this.setState({shop}));
    this.fetchAPIData(API_BASE_URL + "calendar",
        calendar => this.setCalendarStates(calendar));
    this.fetchAPIData(API_BASE_URL + "email",
        email => this.setState({email}));
  }

  fetchWeatherDataSetState(APIKey) {
    const url =
        "http://api.openweathermap.org/data/2.5/weather?id=2661604&APPID="
        + APIKey;
    fetch(url, {
      method: "POST"
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Response was not ok");
    }).then(json => {
      this.setState({weather: json});
      return json;
    }).catch((error) => {
      console.log("Error fetching weather data (" + url + "):", error)
    })
  }

  componentDidMount() {
    this.setAllLocalState();
    setInterval(() => this.setAllLocalState(), DATA_FETCH_INTERVAL_MS);
    if (WEATHER) {
      import("./OpenWeatherMapAPIKey").then(module => {
        this.fetchWeatherDataSetState(module.default);
        setInterval(() => this.fetchWeatherDataSetState(module.default),
            WEATHER_FETCH_INTERVAL_MS)
      }, error => {
        console.log(error)
      })
    }
  }

  render() {
    return (<Container>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} render={props =>
              <Home {...props} alarm={this.state.alarm.upcoming}
                    weather={this.state.weather}
                    sensor={this.state.sensor} today={this.state.today}
                    email={this.state.email} shop={this.state.shop}/>}/>
          <Route path={"/alarm"} render={props => <Alarm {...props}
                                                         alarms={this.state.alarms}/>}/>
          <Route path={"/weather"} component={Weather}/>
          <Route path={"/shopping"} component={Shop}/>
          <Route path={"/calendar"} component={Calendar}/>
          <Route path={"/messages"} component={Email}/>
        </Switch>
      </BrowserRouter>
    </Container>)
  }
}