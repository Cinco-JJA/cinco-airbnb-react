require('dotenv').config();
const chalk = require('chalk');

const db_connected = chalk.bold.cyan;
const db_error = chalk.bold.yellow;
const db_disconnected = chalk.bold.red;
const db_termination = chalk.bold.magenta;

const success = chalk.bold.bgGreen;
const status = chalk.gray;
const error = chalk.bold.bgRed;
const important = chalk.bold.bgCyan;

const DB = process.env.MONGODB_URI || `mongodb://localhost/${require('../package.json').name}`
const NAME = process.env.MONGODB_NAME
const PORT = process.env.PORT || 3000
const COLORS = {
    db_connected,
    db_error,
    db_disconnected,
    db_termination,
    success,
    status,
    important,
    error
}

module.exports = {
    COLORS,
    DB,
    PORT,
    NAME
}