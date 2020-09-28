"use strict";

const express = require('express');
const async = require('async');
const router = express.Router();
const packageController = require('../controllers/packageController.js');

router.get('/', (req, res, next) => {
    packageController.get(req.APP, req, (err, result) => {
        if (err) return req.APP.output.print(req, res, err);

        return req.APP.output.print(req, res, result);
    });
});

router.get('/:id', (req, res, next) => {
    packageController.get(req.APP, req, (err, result) => {
        if (err) return req.APP.output.print(req, res, err);

        return req.APP.output.print(req, res, result);
    });
});

router.post('/', (req, res, next) => {
    packageController.post(req.APP, req, (err, result) => {
        if (err) return req.APP.output.print(req, res, err);

        return req.APP.output.print(req, res, result);
    });
});

router.delete('/:id', (req, res, next) => {
    packageController.delete(req.APP, req, (err, result) => {
        if (err) return req.APP.output.print(req, res, err);

        return req.APP.output.print(req, res, result);
    });
});

router.put('/:id', (req, res, next) => {
    packageController.put(req.APP, req, (err, result) => {
        if (err) return req.APP.output.print(req, res, err);

        return req.APP.output.print(req, res, result);
    });
});

router.patch('/:id', (req, res, next) => {
    packageController.patch(req.APP, req, (err, result) => {
        if (err) return req.APP.output.print(req, res, err);

        return req.APP.output.print(req, res, result);
    });
});

module.exports = router;