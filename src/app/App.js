import React from 'react'
import Routes from './Routes';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const getPath = (props) => {
  return props.path || window.location.pathname;
};

const App = (props) => {
  const { store } = props;
  
  if (store) {
    return (
      <Provider store={store}>
        <Routes path={getPath(props)} />
      </Provider>
    );
  } else {
    const preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;

    const logger = createLogger({});

    return (
      <Provider store={createStore(reducers, preloadedState, applyMiddleware(logger))}>
        <Routes path={getPath(props)} />
      </Provider>
    );
  }
}

export default App
