import React from "react"
import styled from "styled-components"

import {formatDate, TimeFormat} from "../../DateTimeFormat"

import DetailItem from "./DetailItem"
import DetailItemHeading from "./DetailItemHeading"
import DetailItemText from "./DetailItemText"

import clear from "../../graphics/weather/clear.svg"
import partlyCloudy from "../../graphics/weather/partly_cloudy.svg"
import cloudCover from "../../graphics/weather/cloud_cover.svg"
import rain from "../../graphics/weather/rain.svg"
import thunderstorm from "../../graphics/weather/thunderstorm.svg"
import snow from "../../graphics/weather/snow.svg"
import fog from "../../graphics/weather/fog.svg"
import none from "../../graphics/weather/none.svg"

const getIcon = (code) => {
  switch (code) {
    case 800:
      return clear;
    case 801:
      return partlyCloudy;
    case 802:
    case 803:
    case 804:
      return cloudCover;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 511:
    case 521:
    case 522:
    case 531:
      return rain;
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      return thunderstorm;
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      return snow;
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
      return fog;
    default:
      //case 771:
      //case 781:
      return none;
  }
};

const ZERO_CELSIUS_IN_KELVIN = 273.15;

const TimeCell = styled.div`
width: 11vw;
`;

const TemperatureCell = styled.div`
width: 7vw;
`;

const Cell = styled.div`
width: 20vw;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin: 2vw 0;
`;

const Icon = styled.img`
height: 6vw;
margin-right: 4vw;
`;

const DetailForecast = props => {
  return <DetailItem>
    {props.forecast && props.previous
    && props.forecast.dt && props.previous.dt
    && new Date(props.forecast.dt * 1000).getDay()
    === new Date(props.previous.dt * 1000).getDay()
        ? ""
        : <DetailItemHeading>
          {formatDate(new Date(props.forecast.dt * 1000))}
        </DetailItemHeading>}
    <Wrapper>
      {props.forecast && props.forecast.weather[0]
      && props.forecast.weather[0].id
          ? <Icon src={getIcon(props.forecast.weather[0].id)}/>
          : ""}
      <TimeCell>
      <DetailItemText>
        {props.forecast && props.forecast.dt
            ? TimeFormat.format(new Date(props.forecast.dt * 1000))
            : "-"}
      </DetailItemText>
      </TimeCell>
      <TemperatureCell>
      <DetailItemText>
        {props.forecast && props.forecast.main
        && props.forecast.main.temp
            ? Math.round(props.forecast.main.temp - ZERO_CELSIUS_IN_KELVIN)
            : "-"}&#8451;
      </DetailItemText>
      </TemperatureCell>
      <Cell>
      <DetailItemText>
        {props.forecast && props.forecast.weather[0]
            && props.forecast.weather[0].description
            ? props.forecast.weather[0].description
            : "-"}
      </DetailItemText>
      </Cell>
    </Wrapper>
  </DetailItem>
};

export default DetailForecast