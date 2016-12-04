'use strict';

const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');

const infoLevel = new winston.transports.DailyRotateFile({
    name: 'infoLevel',
    filename: path.join(__dirname, '../log/winston.log'),
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
  });

const errorLevel = new winston.transports.DailyRotateFile({
    name: 'errorLevel',
    filename: path.join(__dirname, '../log/winston.error.log'),
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: 'warn'
  });

var logger = new (winston.Logger)({
    transports: [
      infoLevel,
      errorLevel,
      new (winston.transports.Console)({ level: 'info' })
    ]
});

// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
class Log {
  constructor(tag) {
    this.tag = tag|| 'blog_api';
  }

  i() {
    logger.info.apply(this, arguments);
  }

  d() {
    console.log.apply(this, arguments);
    logger.debug.apply(this, arguments);
  }

  v() {
    logger.verbose.apply(this, arguments);
  }

  w() {
    logger.warn.apply(this, arguments);
  }

  e() {
    logger.error.apply(this, arguments);
  }
}

const log = new Log;
module.exports = log;
