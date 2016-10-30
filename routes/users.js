'use strict';

const express = require('express');
const router = express.Router();
const log = require('../common/log');
const User = require('../model/user');
const Result = require('../common/ResponseModel');
const EMPTY = new Result().empty();
const ERROR = new Result().error();
const PAGE_SIZE = 50;
const PAGE_BEGIN = 0; // index count from `0`
const ObjectId = require('mongoose').Types.ObjectId;

/* GET users listing. 
* sort by article count and last update time
* todo: sort by 
*/
router.get('/', function (req, res, next) {
  let page = req.query['page'] || PAGE_BEGIN;
  let size = +(req.query['page_size'] || PAGE_SIZE);
  let last_uid = req.query['last_uid'] | 0;
  let last_name = req.query['last_name'];
  let index = page * size;

  User.find()
    .select('-accessToken')
    .limit(size)
    .skip(index)
    .exec((error, data) => {
      if (error) {
        res.json(ERROR.setMsg(error));
      } else {
        res.json(new Result().setContent(data));
      }
    });
});

router.get('/:id', (req, res) => {
  log.d(req.baseUrl);
  log.d(req.url);
  log.d(req.path);
  log.d(req.originalUrl);
  
  res.end(req.baseUrl);
});

router.post('/:id', (req, res) => {
  res.end(req.baseUrl);
});

module.exports = router;
