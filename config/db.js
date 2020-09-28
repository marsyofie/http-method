"use strict";

/* -------------------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------- MONGO -------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------------------- */
const mongoose = require('mongoose');
const host = process.env.MONGO_HOST;
const name = process.env.MONGO_NAME;

//mongoose.connect('mongodb://' + host + '/' + name);
// mongoose.connection.on('error', console.error.bind(console, 'Database connection error!'));
// mongoose.connection.once('open', () => {
//  console.log('Database connected!');
// });
const optionMongo = {
    reconnectTries: Number.MAX_VALUE, // sets how many times to try reconnecting
    reconnectInterval: 1000, // Reconnect every 1000ms
    poolSize: 10, // Maintain up to 10 socket connections
}
mongoose.connect(`mongodb://${host}/${name}`, optionMongo).then(result => {
    // console.log("Connect mongoDB");
}).catch(err => {
    console.log(`Not Connect MongoDB`);
    console.log(`${err.message}`)
})
// Enabling Bluebird promise, replacement of default mongoose's promise plugin.
mongoose.Promise = require('bluebird').config({
    warnings: {
        wForgottenReturn: false
    }
});
//mongoose.set('debug', true);
exports.mongo = mongoose;