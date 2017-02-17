var express = require('express');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./connection.json');
var signup = require('./routes/signup');

//เรียกใช้ mysql เชื่อมต่อกับฐานข้อมูล
var mysql = require('mysql');
var connection = mysql.createConnection(config);

//ทำการเชื่อมต่อกับฐานข้อมูล
connection.connect(function(err, results) {
    if (err) {
        console.log("ERROR: " + err.message);
        throw err;
    } else
    console.log("connected.");
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
})

app.use('/signup', signup);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function(){
  console.log('Listen on port 3000');
});

module.exports = app;