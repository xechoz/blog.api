'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const Log = require('../common/log');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  Log.i(JSON.stringify(req.params));

  Log.i(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

  if (process.env.NODE_ENV == 'production') {
    res.sendFile(path.join(__dirname, '../client/blog.h5/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../client/blog.h5/dev_index.html'));
  }
});

module.exports = router;
