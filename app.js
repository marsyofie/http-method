"use strict";

const environment = require('./app.json').env;

require('env2')('.env.' + environment);

const events = require('events');

events.EventEmitter.prototype._maxListeners = 100;
events.EventEmitter.defaultMaxListeners = 100;

const fs = require('fs');
const async = require('async');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const trycatch = require('trycatch');
const path = require('path');
const moment = require('moment');

const output = require('./functions/output.js');
//const request = require('./functions/request.js');
const db = require('./config/db.js');
const model = require('./config/model.js');
const validation = require('./functions/validation.js');
const whitelist = require('./whitelist.json');

const app = express();

app.use(bodyParser.json({ limit: process.env.JSON_LIMIT }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    async.waterfall([
        function initializeBaseAPP(callback) {
            req.APP = {};
            req.APP.output = output;
            req.APP.validation = validation;
            req.APP.db = db;

            callback(null, true);
        },
        function initializeModels(index, callback) {
            model(db, (err, result) => {
                if (err) return callback(err);

                req.APP.models = result;

                callback(null, true);
            });
        }
    ], (err, result) => {
        if (err) return output.print(req, res, {
            code: 'GENERAL_ERR'
        });

        return next();
    });
});

app.all('/', (req, res, next) => {
    return output.print(req, res, {
        code: 'SERVICE_NOT_FOUND'
    });
});

app.use((req, res, next) => {
    validation.validate(req, (err, result) => {
        if (err) return output.print(req, res, err);

        return next();
    });
});

fs.readdir('./routes', (err, files) => {
    var len = files.length;
    var lenX = len - 1;
    var n = 0;

    files.map(route => {
        if (route.match('.js')) {
            app.use('/' + route.replace('.js', ''), require('./routes/' + route));
            // console.log('/' + route.replace('.js', ''))
            if (n === lenX) {
                app.use((req, res, next) => {
                    return output.print(req, res, { code: 'SERVICE_NOT_FOUND' });
                });

                app.listen(process.env.PORT, () => {
                    // console.log(moment().format())
                    // return console.log('Bismillah, Semoga service lancar di port ' + process.env.PORT);
                });

            }
        }

        n++;
    });
});

module.exports = app
/* ------------------------------------------------------------------------------------------ */
/* ----------------------------------- TESTING SECTION -------------------------------------- */
/* ------------------------------------------------------------------------------------------ */