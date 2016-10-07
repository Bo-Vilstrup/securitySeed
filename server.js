'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var user = require('./app/routes/user.server.route.js');
var dailyExercises = require('./app/routes/dailyExercises.server.route');
var card = require('./app/routes/card.server.route');
var deck = require('./app/routes/deck.server.route');
var routes = require('./app/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//app.use(function(req, res, next) {
//
//  var sessionUserName = req.session.userName;
//  var formUserName = req.body.userName;
//
//  if( req.url.match(/^\/api\//).toString() === "/api/") return next();
//  if(sessionUserName) return next();
//  if(formUserName) {
//    req.session.userName =  formUserName;
//    res.redirect("/");
//  } else {
//    req.url = "/login";
//    next();
//  }
//});








app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', user);
app.use('/api', dailyExercises);
app.use('/api', card);
app.use('/api', deck);
app.use('/', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
});


module.exports = app;
