import uuid from 'uuid/v4';

import { createLogger, transports, format } from 'winston';
import { renderError }  from './render';

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      format: format.simple(), 
    })
  ]
});

export const context = (req, res, next) => {
  req.requestId = uuid();
  req.logger = logger;
  next();
};

const logRequest = (req, cb) => {
  const start = new Date();
  cb();
  req.logger.info(`${req.method} ${req.path} (${(new Date()) - start}ms)`);
}

export const log = (req, res, next) => {
  logRequest(req, next);
};

const isHTML = (req) => {
  const accept = req.headers['accept'];

  if (!accept) {
    return false;
  } else if (accept.indexOf('text/html') == 0) {
    return true;
  } else if (accept.indexOf('text/xhtml') == 0) {
    return true;
  }

  return false;
}
