'use strict';

const log = require('../common/log');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dev_api');

const db = mongoose.connection;
db.on('error', (error) => {
  log.e(error);
});

db.once('open', function() {
  // we're connected!
  log.d('mongoose open succuss');

});


module.exports = mongoose;
