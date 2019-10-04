const path = require('path')
require('dotenv').config();

const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const nocache = require('nocache')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

require('./config/database')();

const app = express()

app.use(nocache())

// Set "Access-Control-Allow-Origin" header
app.use(
    cors({
        origin: (origin, cb) => {
            cb(null, process.env.NODE_ENV !== 'production')
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Set the public folder
app.use(express.static(path.join(__dirname, '../client')));

// Enable authentication using session + passport
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'super-secret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

require('./passport')(app)

app.locals.title = 'TeamCinco - AirBnB';

app.use('/api/auth', require('./routes/auth'))
app.use('/api/listing', require('./routes/listing'));


module.exports = app;