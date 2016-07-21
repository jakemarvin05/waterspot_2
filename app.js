'use strict';

// load environment variables
require('dotenv').load();

// load modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Sequelize =  require('sequelize');
var flash    = require('connect-flash');
var pg = require('pg');
var expressSession = require('express-session');
var hogan = require('hogan-express');

// load globals
global._ = require('underscore');
global.DEBUG = require('debug');
global.CHECK_AUTH = require('./apps/passport/checkAuth.js'); // checkAuth is a centralised authentication response for APIs
global.D = require('dottie');
global.configDB = require('./config/database.js');
global.DB = require('./models/index.js');
global.passport = require('passport');

// define the express app
var app = express();
var routes = require('./routes/index');
var adminRoutes = require('./routes/admin/index');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout.html');
app.set('view engine', 'html');
app.engine('html', hogan );

// Connect to the DataBase
var sequelize = new Sequelize(configDB.url);
sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Configuring Passport
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport.js')(passport);


// routes ======================================================================
//require('./routes/index.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.use('/', routes);
app.use('/admin', adminRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
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
