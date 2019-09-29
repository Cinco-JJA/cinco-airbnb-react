
require('dotenv').config();
const chalk = require('chalk');

const db_connected = chalk.bold.cyan;
const db_error = chalk.bold.yellow;
const db_disconnected = chalk.bold.red;
const db_termination = chalk.bold.magenta;

const success = chalk.bold.blueBright;
const status = chalk.gray;
const error = chalk.bold.redBright;
const important = chalk.bold.cyanBright;

const projectName = require('../package.json').name


module.exports = {
    COLORS: {
        db_connected,
        db_error,
        db_disconnected,
        db_termination,
        success,
        status,
        important,
        error
    },
    PORT : 4000,
    DB : `${process.env.MONGO_URI}${projectName}`,
}