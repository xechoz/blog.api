'use strict';

const log = require('../common/log');
const mongoose = require('mongoose');
const dbPath= 'mongodb://localhost/' + (process.env.NODE_ENV == 'production' ? 'app_api': 'dev_api');
mongoose.connect(dbPath);

log.d('db path: ' + dbPath);

const db = mongoose.connection;
db.on('error', (error) => {
  log.e(error);
});

db.once('open', function() {
  // we're connected!
  log.d('mongoose open succuss');

});


module.exports = mongoose;
