import request from 'request';
import express from 'express';

import { sortBy } from 'lodash';
import url from 'url';

import { context, log } from './middleware';
import { renderError, renderHtml, renderRedirect } from './render';
import moment from 'moment';

const app = express()

app.use(express.static('public'));
app.use(context, log);

const processWeatherResponse = (body) => {
  const data = JSON.parse(body); 

  if (!data) {
    return {
      conditions: 'unknown',
      temp: 0,
    };
  }

  return {
    conditions: data.weather[0].main,
    temp: data.main.feels_like,
  };
};

app.get('/', (req,res) => {
  let city = 'portland';
  let apiKey = process.env.OPEN_WEATHER_MAP_KEY;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, (err, resp, body) => {
    renderHtml(req, res, {weather: processWeatherResponse(body)});  
  });
})

export default app
