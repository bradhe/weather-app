import fs from 'fs';

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from "redux";
import Helmet from 'react-helmet';
import Mustache from 'mustache';

import reducers from '../app/reducers';
import App from '../app/App'

const errors = {
  "unknown": {
    "status": 500,
    "message": "You must be authenticated",
  },
  "internal_server_error": {
    "status": 500,
    "message": "An internal error occured",
  },
}

export const renderError = (req, res, name) => {
  const err = errors[name] || errors['unknown'];
  err.code = name;
  res.statusCode = err.status;
  res.json(err);
};

const getState = (req, preloadedState) => {
  const defaultState = {};
  return Object.assign({}, defaultState, preloadedState);
}

const dumpState = (obj) => {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
};

export const renderHtml = (req, res, preloadedState) => {
  const state = getState(req, preloadedState);
  const store = createStore(reducers, getState(req, preloadedState));

  const application = renderToString(<App store={store} path={req.path} />)
  const helmet = Helmet.renderStatic();

  fs.readFile('src/app/index.html', (err, tmpl) => {
    if (err) {
      throw err;
    };

    const content = {
      helmet,
      application,
      preloadedState: dumpState(state),
      client_bundle_host: process.env.BUNDLE_HOST,
    };

    res.header('Content-Type', 'text/html');
    res.send(Mustache.render(tmpl.toString(), content));
  })
};

export const renderRedirect = (req, res, location) => {
  res.header("Content-Type", "text/html");
  res.redirect(location);
};
