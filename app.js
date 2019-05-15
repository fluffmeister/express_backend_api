const createError = require('http-errors');
const express = require('express');
var BnetStrategy = require('passport-bnet').Strategy;
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()

require('./db/db')

const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');
const passport = require('passport');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/d3/data', apiRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
/*app.use((req, res, next) =>{
  next(createError(404));
});*/

// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  callbackURL: "http://localhost:3001/auth/bnet/callback",
  region: "us"
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/bnet',
    passport.authenticate('bnet'));
 
app.get('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res){
        res.redirect('https://us.api.blizzard.com/d3/data/item/corrupted-ashbringer-Unique_Sword_2H_104_x1?locale=en_US&access_token=US8PwUayCLRXkKuwcxJEhyXoh9iuy2yiyo');
    });

module.exports = app;
