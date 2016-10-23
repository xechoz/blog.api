'use strict';

var express = require('express');
var router = express.Router();
let BASE_PATH = '/todo';

/* GET home page. */
router.get(BASE_PATH + '/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
