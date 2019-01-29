import React from "react";
import styled from "styled-components"
import {BrowserRouter, Route, Switch} from "react-router-dom"

import theme from "./theme"

import Home from "./page/Home"
import APIKey from "./OpenWeatherMapAPIKey";
import ErrorPopup from "./component/popup/ErrorPopup";
import SuccessPopup from "./component/popup/SuccessPopup";
import AddAlarmPopup from "./component/popup/AddAlarmPopup";
import ShopPopup from "./component/popup/ShopPopup";
import DetailPage from "./component/detail/DetailPage"
import DetailAlarm from "./component/detail/DetailAlarm";
import DetailEvent from "./component/detail/DetailEvent";
import DetailEmail from "./component/detail/DetailEmail";
import AlarmRinging from "./component/popup/AlarmRinging";
import DetailForecast from "./component/detail/DetailForecast";
import {TimeFormat} from "./DateTimeFormat";
import Splash from "./component/Splash";

const API_PORT = 80;
const API_BASE_URL = "http://" + window.location.hostname + ":" + API_PORT
    + "/api/";
const API_URL = {
  alarm: API_BASE_URL + "alarm",
  sensor: API_BASE_URL + "sensor",
  shop: API_BASE_URL + "shop",
  calendar: API_BASE_URL + "calendar",
  email: API_BASE_URL + "email",
  add: {
    alarm: API_BASE_URL + "alarm/add?",
    shop: API_BASE_URL + "shop/add?",
  },
  remove: {
    alarm: API_BASE_URL + "alarm/remove?"
  },
  clear: {
    shop: API_BASE_URL + "shop/clear"
  },
  speak: API_BASE_URL + "alarm/speak"
};
const FETCH_INTERVAL = {
  alarm: 5000,
  weather: 15 * 60000,
  forecast: 60 * 60000,
  sensor: 5000,
  shop: 5000,
  calendar: 5 * 60000,
  email: 5 * 60000
};
const POPUP_TIMEOUT_MS = {
  error: 5000,
  success: 2000,
  tolerance: 500
};
const WEATHER = true;

const Container = styled.div`
box-sizing: border-box;
position: relative;
padding: ${theme.containerPadding};
height: 100vh;
width: 100vw;
overflow: hidden;
background-color: white;
${theme.invert ? "filter: invert(100%);" : ""}
font-family: ${theme.fontFamily};
`;

export {
  API_BASE_URL
}

export default class SmartPi extends React.Component {

  state = {
    alarms: undefined,
    alarm: {
      upcoming: undefined
    },
    ringing: {
      ringing: false,
      alarm: undefined
    },
    weather: undefined,
    forecast: undefined,
    sensor: undefined,
    shop: undefined,
    calendar: undefined,
    today: undefined,
    email: undefined,
    adding: {
      alarm: false,
      shop: false
    },
    error: {
      error: false,
      message: undefined,
      timestamp: 0
    },
    success: {
      success: false,
      message: undefined,
      timestamp: 0
    },
    splash: true
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

  setUpcomingAlarmState(alarms, now) {
    let upcoming = alarms[0];
    let nowHour = now.getHours() + 1;
    for (let alarm of alarms) {
      if (alarm.hour > nowHour || (alarm.hour >= nowHour
          && alarm.minute > now.getMinutes())) {
        upcoming = alarm;
        break;
      }
    }
    this.setState({alarm: {upcoming, ringing: this.state.alarm.ringing}});
  }

  setAlarmRingingState(alarms, now) {
    for (let alarm of alarms) {
      if (alarm.hour === now.getHours() + 1
          && alarm.minute === now.getMinutes() && now.getSeconds() <= 1) {
        this.setState({ringing: {ringing: true, alarm: alarm}});
      }
    }
  }

  setAlarmStates(alarms) {
    if (alarms) {
      let now = new Date();
      this.setUpcomingAlarmState(alarms, now);
      this.setAlarmRingingState(alarms, now);
    }
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
      this.showError("Couldn't fetch weather: " + error.message);
      console.log("Error fetching weather data (" + url + "):", error)
    })
  }

  fetchForecastDataSetState(APIKey) {
    const url =
        "http://api.openweathermap.org/data/2.5/forecast?id=2661604&APPID="
        + APIKey;
    fetch(url, {
      method: "POST"
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Response was not ok");
    }).then(json => {
      this.setState({forecast: json});
      console.log(json);
      return json;
    }).catch((error) => {
      this.showError("Couldn't fetch forecast: " + error.message);
      console.log("Error fetching forecast data (" + url + "):", error)
    })
  }

  fetchSetAlarm() {
    this.fetchAPIData(API_URL.alarm,
        alarms => {
          this.setState({alarms});
          this.setAlarmStates(alarms);
        });
  }

  fetchSetSensor() {
    this.fetchAPIData(API_URL.sensor,
        sensor => this.setState({sensor}));
  }

  fetchSetShop() {
    this.fetchAPIData(API_URL.shop,
        shop => this.setState({shop}));
  }

  fetchSetCalendar() {
    this.fetchAPIData(API_URL.calendar,
        calendar => {
          for (let event of calendar) {
            event.date = new Date(event.date);
          }
          this.setCalendarStates(calendar)
        });
  }

  fetchSetEmail() {
    this.fetchAPIData(API_URL.email,
        email => this.setState({email}));
  }

  componentDidMount() {
    this.fetchSetAlarm();
    this.fetchSetSensor();
    this.fetchSetShop();
    this.fetchSetCalendar();
    this.fetchSetEmail();
    this.setAlarmStates(this.state.alarms);

    setInterval(() => this.fetchSetAlarm(), FETCH_INTERVAL.alarm);
    setInterval(() => this.fetchSetSensor(), FETCH_INTERVAL.sensor);
    setInterval(() => this.fetchSetShop(), FETCH_INTERVAL.shop);
    setInterval(() => this.fetchSetCalendar(), FETCH_INTERVAL.calendar);
    setInterval(() => this.fetchSetEmail(), FETCH_INTERVAL.email);
    setInterval(() => this.setAlarmStates(this.state.alarms), 1000);
    if (WEATHER) {
      this.fetchWeatherDataSetState(APIKey);
      this.fetchForecastDataSetState(APIKey);
      setInterval(() => this.fetchWeatherDataSetState(APIKey),
          FETCH_INTERVAL.weather);
      setInterval(() => this.fetchForecastDataSetState(APIKey),
          FETCH_INTERVAL.forecast);
    }
    setTimeout(() => this.setState({splash: false}), 2000);
  }

  test(alarms, adding) {
    this.setState({alarms, adding});
  }

  showError(message) {
    this.setState(
        {error: {error: true, message, timestamp: Date.now()}});
    setTimeout(() => {
      if (this.state.error.timestamp <= Date.now()
          - POPUP_TIMEOUT_MS.error + POPUP_TIMEOUT_MS.tolerance) {
        this.setState({error: {error: false}})
      }
    }, POPUP_TIMEOUT_MS.error);
  }

  showSuccess(message) {
    this.setState({success: {success: true, message, timestamp: Date.now()}});
    setTimeout(() => {
          if (this.state.success.timestamp <= Date.now()
              - POPUP_TIMEOUT_MS.success + POPUP_TIMEOUT_MS.tolerance) {
            this.setState({success: {success: false}})
          }
        },
        POPUP_TIMEOUT_MS.success);
  }

  addAlarm(alarm) {
    fetch(API_URL.add.alarm + encodeURIComponent(JSON.stringify(alarm)))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Response was not ok.");
    }).then(json => {
      if (json.success) {
        let alarms = this.state.alarms;
        alarms.push(alarm);
        this.setState({alarms, adding: {alarm: false}});
        this.showSuccess("Alarm " + alarm.name + " at " + TimeFormat.format(
            new Date(1970, 1, 1, alarm.hour - 1, alarm.minute)) + " added");
      } else {
        throw new Error(json.message);
      }
    }).catch(error => {
      this.showError("Couldn't add alarm: " + error.message);
      console.log("Couldn't add alarm: ", error)
    });
  }

  removeAlarm(remove) {
    fetch(API_URL.remove.alarm + encodeURIComponent(remove.name))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Response was not ok.");
    }).then(json => {
      if (json.success) {
        let alarms = [];
        for (let alarm of this.state.alarms) {
          if (alarm !== remove) {
            alarms.push(alarm);
          }
        }
        this.setState({alarms});
        this.showSuccess("Alarm " + remove.name + " removed");
      } else {
        throw new Error(json.message);
      }
    }).catch((error) => {
      this.showError("Couldn't remove alarm: " + error.message);
      console.log("Couldn't remove alarm: ", error)
    });
  }

  addShopItem(item) {
    if (item === undefined) {
      this.showError("Can't add nothing");
      return;
    }
    fetch(API_URL.add.shop + encodeURIComponent(item))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Response was not ok.");
    }).then(json => {
      if (json.success) {
        let shop = this.state.shop;
        shop.push(item);
        this.setState({shop, adding: {shop: false}});
        this.showSuccess(item + " added to shopping list");
      } else {
        throw new Error(json.message);
      }
    }).catch(error => {
      this.showError("Couldn't add item: " + error.message);
      console.log("Couldn't add item: ", error)
    });
  }

  showAlarmPopup() {
    this.setState({adding: {alarm: true}});
  }

  showShopPopup() {
    this.setState({adding: {shop: true}});
  }

  closePopup() {
    this.setState({adding: {alarm: false, shop: false}});
  }

  dismissAlarm() {
    this.setState({ringing: false});
    fetch(API_URL.speak)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Response was not ok.");
    }).then(json => {
      if (json.success === false) {
        throw new Error(json.message);
      }
    }).catch((error) => {
      this.showError("Couldn't activate text-to-speech: " + error.message);
      console.log("Couldn't activate text-to-speech: ", error)
    });
  }

  render() {
    return (<Container>
      {this.state.splash
          ? <Splash/>
          : ""}
      {this.state.error.error
          ? <ErrorPopup>{this.state.error.message}</ErrorPopup>
          : ""}
      {this.state.success.success
          ? <SuccessPopup>{this.state.success.message}</SuccessPopup>
          : ""}
      {this.state.ringing.ringing
          ? <AlarmRinging dismissAlarm={this.dismissAlarm.bind(this)}
                          alarm={this.state.ringing.alarm}/>
          : ""}
      {this.state.adding.alarm
          ? <AddAlarmPopup addAlarm={this.addAlarm.bind(this)}
                           closePopup={this.closePopup.bind(this)}/>
          : ""}
      {this.state.adding.shop
          ? <ShopPopup addShopItem={this.addShopItem.bind(this)}
                       closePopup={this.closePopup.bind(this)}/>
          : ""}
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} render={props =>
              <Home {...props} alarm={this.state.alarm.upcoming}
                    weather={this.state.weather}
                    sensor={this.state.sensor}
                    today={this.state.today}
                    email={this.state.email}
                    shop={this.state.shop}
                    showAlarmPopup={this.showAlarmPopup.bind(this)}
                    showShopPopup={this.showShopPopup.bind(this)}/>}/>
          <Route path={"/alarm"} render={props =>
              <DetailPage {...props} title={"alarms"}>
                {this.state.alarms
                    ? this.state.alarms.map((alarm, index) =>
                        <DetailAlarm key={index} alarm={alarm}
                                     removeAlarm={this.removeAlarm.bind(
                                         this)}/>)
                    : "-"}
              </DetailPage>}/>
          <Route path={"/weather"} render={props =>
              <DetailPage {...props} title={"forecast"}>
                {this.state.forecast && this.state.forecast.list
                    ? this.state.forecast.list.map((forecast, index) =>
                        <DetailForecast key={index} forecast={forecast}
                                        previous={this.state.forecast.list[index
                                        - 1]}/>)
                    : <DetailForecast/>}
              </DetailPage>}/>
          <Route path={"/calendar"} render={props =>
              <DetailPage {...props} title={"calendar"}>
                {this.state.calendar
                    ? this.state.calendar.map((event, index) =>
                        <DetailEvent key={index} event={event}/>)
                    : <DetailEvent/>}
              </DetailPage>}/>
          <Route path={"/messages"} render={props =>
              <DetailPage {...props} title={"email"}>
                {this.state.email
                    ? this.state.email.map(
                        (email, index) => <DetailEmail key={index}
                                                       email={email}/>)
                    : <DetailEmail/>}
              </DetailPage>}/>
        </Switch>
      </BrowserRouter>
    </Container>)
  }
}