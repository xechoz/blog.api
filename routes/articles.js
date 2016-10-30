'use strict';

const express = require('express');
const router = express.Router();
const log = require('../common/log');
const Result = require('../common/ResponseModel');
const EMPTY = new Result().empty();
const ERROR = new Result().error();
const Article = require('../model/article');
const PAGE_SIZE = 50;
const TIME_OUT = 15*1000; // db action time out

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.params);

  Article.find()
    .limit(PAGE_SIZE)
    .sort('creatAt')
    .exec((error, data) => {
      if (!error) {
        log.d(data);
        let articles = data;
        res.json(new Result(Result.OK, req.params, articles));
      } else {
        res.json(new Result(Result.FAIL, error));
      }
    });
});

router.get('/:id', function (req, res, next) {
  log.d(req.params);
  const id = req.params['id'];
  Article.findById(id)
    .exec((error, data) => {
      if (!error) {
        let item = data;
        res.json(new Result(Result.OK, req.params, item));
      } else {
        res.json(error.setMsg(error));
      }
    });
});

router.post('/', (req, res, next) => {
  log.d(req.body);
  const article = {
    atitle: req.body['title'],
    author: req.body['author'],
    content: req.body['content']
  };

  Article.create(article, (error, data) => {
    if (error) {
      res.json(ERROR.setMsg(error));
    } else {
      let item = data; // TODO: filter output field
      res.json(new Result(Result.OK, req.body, item));
    }
  });
});

router.post('/:id', (req, res) => {
  log.d(req.params);
  log.d(req.body);

  const update = req.body;
  const id = req.params.id;
  const options = {
    select: 'title content tags comments',
    maxTimeMS: TIME_OUT
  };

  Article.findByIdAndUpdate(id, update, options, error => {
    if (error) {
      res.json(ERROR.setMsg(error));
    } else {
      res.json(EMPTY);
    }
  });
});

router.delete('/:id', (req, res) => {

});
module.exports = router;
