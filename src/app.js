var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")


//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var housingRoutes = require('./routes/housingRoutes');
var requestsRoutes = require('./routes/requestRoutes');

var app = express();

//Load environment variables
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());



//Connect to database
const mongoose = require("mongoose");
//muestro variables entorno
console.log('db user', process.env.DB_USER);
console.log('db pasword', process.env.DB_PASSWORD);
console.log('db user', process.env.DB_SERVER);


const mongoDB = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_SERVER + "/" + process.env.DB_NAME + "?retryWrites=true&w=majority";
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch(err => console.log(err));


//Load routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
