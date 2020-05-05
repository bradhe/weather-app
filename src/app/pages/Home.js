import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Conditions from '../components/Conditions';
import Temperature from '../components/Temperature';

const Home = (props) => {
  const { weather } = props;
  console.log('weather', weather);

  return (
    <React.Fragment>
      <Helmet>
        <title>Weather in Portland, OR</title>
        <meta name="description" content="Share your trips around the world." />
      </Helmet>

      <Conditions conditions={weather.conditions} />
      <Temperature temp={weather.temp} />
    </React.Fragment>
  );
};

const mapStateToProps = (state, context) => {
  const weather = state.weather;

  return {
    weather: weather,
  }
};

export default connect(mapStateToProps)(Home);
