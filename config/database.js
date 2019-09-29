var mongoose = require('mongoose');
var { DB, COLORS } = require('./properties');

module.exports = function() {
    mongoose.connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });

    mongoose.connection.on('connected', function() {
        console.log(COLORS.db_connected("Mongoose default connection is open to ", DB));
    });

    mongoose.connection.on('error', function(err) {
        console.log(COLORS.db_error("Mongoose default connection has occurred " + err + " error"));
    });

    mongoose.connection.on('disconnected', function() {
        console.log(COLORS.db_disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log(COLORS.db_termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });

    return mongoose.connection
}