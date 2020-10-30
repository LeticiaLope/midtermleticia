//<!--app.js, Leticia Lopez, 301087698, midterm-->
//installed third party pckgs
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
//let cors = require('cors'); //v3

//modules for authentication
//let session = require('express-session'); //v3
//let passport = require('passport'); //v3

//let passportJWT = require('passport-jwt'); //v3
//let JWTStrategy = passportJWT.Strategy; //v3
//let ExtractJWT = passportJWT.ExtractJwt; //v3

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//database setup
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

//routers
let indexRouter = require('../routes/index');
let booksRouter = require('../routes/book');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); //express -e
//activations
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public'))); 
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
/*app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));*/ //v3

//initialize flash
app.use(flash());

//initialize passport
//app.use(passport.initialize()); //v3
//app.use(passport.session()); //v3

/*let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;*/ //v3

//v2 commented
/*let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});*/

//v2 commented
//passport.use(strategy);

// routing
app.use('/', indexRouter);
app.use('/books', booksRouter);

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
  res.render('error', { title: 'Error'});
});
module.exports = app;
