var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var get = require('./routes/get')
var post = require('./routes/post')
var home = require('./routes/home')
var contact = require('./routes/contact');
var cases1 = require('./routes/cases1');
var cases2 = require('./routes/cases2');
var gengduo = require('./routes/gengduo');
var img = require('./routes/img');
var chinese1 = require('./routes/chinese1');
var chinese2 = require('./routes/chinese2');
var more = require('./routes/more');
var careers = require('./routes/careers');
var careers1 = require('./routes/careers1');
var careers2 = require('./routes/careers2');
var know = require('./routes/know');

var careers3 = require('./routes/careers3');
var backcases = require('./routes/back/backcases');


var we = require('./routes/we');
var we_n = require('./routes/we_n');

var img = require('./routes/img');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/get', get);
app.use('/post', post);
app.use('/cebest', home);
app.use('/cebest', contact);
app.use('/cebest', cases1);
app.use('/cebest', cases2);
app.use('/cebest', gengduo);
app.use('/cebest', img);
app.use('/cebest', chinese1);
app.use('/cebest', chinese2);
app.use('/cebest', more);
app.use('/cebest', careers);
app.use('/cebest', careers1);
app.use('/cebest', careers2);


app.use('/cebest', careers3);
app.use('/cebest', backcases);

app.use('/cebest', we);
app.use('/cebest', we_n);

app.use('/cebest', know);


// catch 404 and forward to error handler
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

app.listen(8100,function (){
	console.log("Server Start!")
});

module.exports = app;
