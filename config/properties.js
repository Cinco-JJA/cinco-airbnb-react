
var chalk = require('chalk');

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

var success = chalk.bold.blueBright;
var status = chalk.gray;
var error = chalk.bold.redBright;
var important = chalk.bold.cyanBright;


module.exports = {
    COLORS: {
        connected,
        error,
        disconnected,
        termination,
        success,
        status,
        important,
        error
    },
    PORT : 4000,
    DB : 'mongodb://localhost:27017/cinco-airbnb',
}