require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const path = require('path');
const hbs = require('hbs');
const db = require('./config/database')();

const app = express();

// Session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'insecure-secret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
}));

// Flash Setup
app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.sessionFlash = req.session.sessionFlash;
    res.locals.failureMsg = req.flash('failure')
    res.locals.messageMsg = req.flash('message')
    res.locals.successMsg = req.flash('success')
    delete req.session.sessionFlash;
    next();
})

// Handlebars and publicdir and favicon setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon', 'favicon.ico')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.locals.title = 'TeamCinco - AirBnB';

app.use('/', require('./routes/index'));
app.use('/', require('./routes/listing'));
app.use('/api/listing', require('./routes/api/listing'));


module.exports = app;