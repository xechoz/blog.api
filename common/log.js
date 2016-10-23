'use strict';

class Log {
  constructor(tag) {
    this.tag = tag|| 'xechoz';
  }

  d() {
    console.log.apply(this, arguments);
  }

  v() {

  }

  w() {
  }

  e() {

  }
}

module.exports = new Log;
