'use strict';

var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  res.sendFile(path.join(__dirname, '../client/blog.h5/index.html'));
});

module.exports = router;
