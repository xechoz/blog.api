'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const Log = require('./common/log');

Log.i('app init begin');

const api = {
    index: require('./routes/index'),
    users: require('./routes/users'),
    articles: require('./routes/articles'),
    admin: require('./routes/admin'),
    account: require('./routes/account')
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/blog.h5/statics'))); // h5 client
app.use(express.static(path.join(__dirname, 'client/blog.h5/node_modules'))); 

// app.use('/', routes);
// app.use('/users', users);

app.all('*', function(req, res, next) {
  if (!res.header('Accdess-Control-Allow-Origin')) {
  	res.header('Access-Control-Allow-Origin', '*');
	}
	
	if (!res.header('Access-Control-Allow-Headers')) { 
	  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }

	next();
});

// all routes come here
app.use('/', api.index);
app.use('/users', api.users);
app.use('/articles', api.articles);
app.use('/admin', api.admin);
app.use('/account', api.account);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);

  Log.e(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });

  Log.e(JSON.stringify(req), JSON.stringify(res));
});

require('./model');

Log.i('app init finished');
module.exports = app;
