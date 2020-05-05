import http from 'http'
import express from 'express';
import app from './server'

let currentApp = null;

const server = http.createServer(app)
server.listen(3000)

const setApp = (app) => {
  if (currentApp) {
    server.removeListener('request', currentApp)
    server.on('request', app)
  }

  app.use('/assets', express.static('src/app/static'));

  currentApp = app
};

setApp(app);

if (module.hot) {
    module.hot.accept('./server', () => {
        setApp(app);
    })
}
