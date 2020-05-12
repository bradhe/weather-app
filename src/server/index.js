import http from 'http'
import express from 'express';
import app from './server'
import guardtower from 'guardtower';

let currentApp = null;

const server = http.createServer(app)
server.listen(process.env.PORT || 3000)

//
// Start guardtower
//

guardtower.on('vulnerable', (vulnerabilities) => {
  console.log('vulnerabilities found! should we tell someone?', vulnerabilities);
});

const pub = process.env.GUARDTOWER_PUBLIC_KEY;
const priv = process.env.GUARDTOWER_PRIVATE_KEY;

// Start the guardtower agent to monitor for vulnerabilities.
guardtower.start(pub, priv, require('./guardtower.gen.js'));

//
// End guardtower
//

const setApp = (app) => {
  if (currentApp) {
    server.removeListener('request', currentApp)
    server.on('request', app)
  }

  if (process.env.NODE_ENV === 'production') {
    // We add in serving static assets because we don't have capabilities to do
    // so as part of the standard server package.
    app.use('/assets', express.static('build/assets'))
  } else {
    app.use('/assets', express.static('src/app/static'));
  }

  currentApp = app
};

setApp(app);

if (module.hot) {
    module.hot.accept('./server', () => {
        setApp(app);
    })
}
