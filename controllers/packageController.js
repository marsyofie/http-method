"use strict";

const async = require('async');
const randomstring = require('randomstring');
const moment = require('moment');
var output = {};

exports.post = (APP, req, callback) => {
    var json = req.body;
    async.waterfall([
        function(callback) {
            if (!json.transaction_id) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_id" } });
            if (!json.customer_name) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_name" } });
            if (!json.customer_code) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_code" } });
            if (!json.transaction_amount && json.transaction_amount < 0) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_amount" } });
            if (!json.transaction_discount && json.transaction_discount < 0) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_discount" } });
            // if (!json.transaction_additional_field) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_additional_field" } });
            if (!json.transaction_payment_type) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_payment_type" } });
            if (!json.transaction_state) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_state" } });
            if (!json.transaction_code) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_code" } });
            if (!json.transaction_order) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_order" } });
            if (!json.location_id) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "location_id" } });
            if (!json.organization_id) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "organization_id" } });
            if (!json.transaction_payment_type_name) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_payment_type_name" } });
            if (!json.transaction_cash_amount && json.transaction_cash_amount < 0) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_cash_amount" } });
            if (!json.transaction_cash_change && json.transaction_cash_change < 0) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_cash_change" } });
            if (!json.customer_attribute) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_attribute" } });
            if (!json.connote) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "connote" } });
            if (!json.connote_id) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "connote_id" } });
            
            if (!json.origin_data) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "origin_data" } });
            if (!(json.origin_data && json.origin_data.customer_name)) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_name" } });
            if (!(json.origin_data && json.origin_data.customer_address)) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_address" } });
            if (!(json.origin_data && json.origin_data.customer_zip_code)) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_zip_code" } });
            if (!(json.origin_data && json.origin_data.customer_phone)) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_phone" } });


            if (!json.destination_data) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "destination_data" } });
            if (!(json.destination_data && json.destination_data.customer_name)) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_name" } });
            if (!(json.destination_data && json.destination_data.customer_address)) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_address" } });
            if (!(json.destination_data && json.destination_data.customer_zip_code)) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_zip_code" } });
            if (!(json.destination_data && json.destination_data.customer_phone)) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_phone" } });

            if (!json.koli_data) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "koli_data" } });
            if (!json.custom_field) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "custom_field" } });
            if (!json.currentLocation) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "currentLocation" } });

            callback(null, true)
        },
        function(data, callback) {
            let query = {
                transaction_id: json.transaction_id,
                customer_name: json.customer_name,
                customer_code: json.customer_code,
                transaction_amount: json.transaction_amount,
                transaction_discount: json.transaction_discount,
                transaction_additional_field: json.transaction_additional_field,
                transaction_payment_type: json.transaction_payment_type,
                transaction_state: json.transaction_state,
                transaction_code: json.transaction_code,
                transaction_order: json.transaction_order,
                location_id: json.location_id,
                organization_id: json.organization_id,
                transaction_payment_type_name: json.transaction_payment_type_name,
                transaction_cash_amount: json.transaction_cash_amount,
                transaction_cash_change: json.transaction_cash_change,
                customer_attribute: json.customer_attribute,
                connote: json.connote,
                connote_id: json.connote_id,
                origin_data: json.origin_data,
                destination_data: json.destination_data,
                koli_data: json.koli_data,
                custom_field: json.custom_field,
                currentLocation: json.currentLocation,
            }

            APP.models.mongo.package.create(query).then(result => {
                output = {
                    code: 'OK'
                }
                callback(null, output)
            }).catch(err => {
                output = {
                    code: 'ERR_DATABASE',
                    data: err
                }
                callback(output)
            })
        }
    ], (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result)
        }
    });
};

exports.get = (APP, req, callback) => {
    //var json = req.body;
    let query = {}
    async.waterfall([
        function(callback) {
            if (req.params && req.params.id) query = { _id: req.params.id }

            callback(null, true)

        },
        function(data, callback) {
            APP.models.mongo.package.find(query).then(result => {
                if (result.length > 0) {
                    output = {
                        code: 'FOUND',
                        data: result
                    }

                    if (result.length == 1) output.data = result[0];

                    callback(null, output)
                } else {
                    output = {
                        code: 'NOT_FOUND'
                    }
                    callback(output)
                }
            }).catch(err => {
                output = {
                    code: 'ERR_DATABASE',
                    data: err
                }
                callback(output)

            })
        }
    ], (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result)
        }
    });
};

exports.delete = (APP, req, callback) => {
    //var json = req.body;
    let query = {}
    async.waterfall([
        function(callback) {
            if (req.params && req.params.id) query = { _id: req.params.id }

            callback(null, true)

        },
        function(data, callback) {
            APP.models.mongo.package.deleteOne(query).then(result => {
                if (result.n > 0) {
                    output = {
                        code: 'DELETE_OK',
                    }

                    callback(null, output)
                } else {
                    output = {
                        code: 'NOT_FOUND'
                    }
                    callback(output)
                }
            }).catch(err => {
                output = {
                    code: 'ERR_DATABASE',
                    data: err
                }
                callback(output)

            })
        }
    ], (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result)
        }
    });
};

exports.put = (APP, req, callback) => {
    var json = req.body;
    let query = {};
    let where = {};
    async.waterfall([
        function(callback) {
            if (!json.transaction_id) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_id" } });
            if (!json.customer_name) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_name" } });
            if (!json.customer_code) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_code" } });
            if (!json.transaction_amount) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_amount" } });
            if (!json.transaction_discount) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_discount" } });
            // if (!json.transaction_additional_field) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_additional_field" } });
            if (!json.transaction_payment_type) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_payment_type" } });
            if (!json.transaction_state) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_state" } });
            if (!json.transaction_code) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_code" } });
            if (!json.transaction_order) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_order" } });
            if (!json.location_id) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "location_id" } });
            if (!json.organization_id) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "organization_id" } });
            if (!json.transaction_payment_type_name) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_payment_type_name" } });
            // if (!json.transaction_cash_amount) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_cash_amount" } });
            // if (!json.transaction_cash_change) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "transaction_cash_change" } });
            if (!json.customer_attribute) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "customer_attribute" } });
            if (!json.connote) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "connote" } });
            if (!json.connote_id) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "connote_id" } });
            if (!json.origin_data) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "origin_data" } });
            if (!json.destination_data) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "destination_data" } });
            if (!json.koli_data) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "koli_data" } });
            if (!json.custom_field) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "custom_field" } });
            if (!json.currentLocation) return callback({ code: 'MISSING_KEY', data: { missing_parameter: "currentLocation" } });

            callback(null, true)

        },
        function(data, callback) {
            if (req.params && req.params.id) where = { _id: req.params.id }

            query = {
                transaction_id: json.transaction_id,
                customer_name: json.customer_name,
                customer_code: json.customer_code,
                transaction_amount: json.transaction_amount,
                transaction_discount: json.transaction_discount,
                transaction_additional_field: json.transaction_additional_field,
                transaction_payment_type: json.transaction_payment_type,
                transaction_state: json.transaction_state,
                transaction_code: json.transaction_code,
                transaction_order: json.transaction_order,
                location_id: json.location_id,
                organization_id: json.organization_id,
                transaction_payment_type_name: json.transaction_payment_type_name,
                transaction_cash_amount: json.transaction_cash_amount,
                transaction_cash_change: json.transaction_cash_change,
                customer_attribute: json.customer_attribute,
                connote: json.connote,
                connote_id: json.connote_id,
                origin_data: json.origin_data,
                destination_data: json.destination_data,
                koli_data: json.koli_data,
                custom_field: json.custom_field,
                currentLocation: json.currentLocation,
            }

            callback(null, true)
        },
        function(data, callback) {
            APP.models.mongo.package.findOneAndUpdate(where, query).then(result => {
                if (result) {
                    output = {
                        code: 'UPDATE_OK',
                    }

                    callback(null, output)
                } else {
                    output = {
                        code: 'NOT_FOUND',
                    }

                    callback(output)
                }

            }).catch(err => {
                output = {
                    code: 'ERR_DATABASE',
                    data: err
                }
                callback(output)

            })
        }
    ], (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result)
        }
    });
};

exports.patch = (APP, req, callback) => {
    var json = req.body;
    let query = {};
    let where = {};
    async.waterfall([
        function(callback) {
            if (json.transaction_id) query.transaction_id = json.transaction_id;
            if (json.customer_name) query.customer_name = json.customer_name;
            if (json.customer_code) query.customer_code = json.customer_code;
            if (json.transaction_amount) query.transaction_amount = json.transaction_amount;
            if (json.transaction_discount) query.transaction_discount = json.transaction_discount;
            if (json.transaction_additional_field) query.transaction_additional_field = json.transaction_additional_field;
            if (json.transaction_payment_type) query.transaction_payment_type = json.transaction_payment_type;
            if (json.transaction_state) query.transaction_state = json.transaction_state;
            if (json.transaction_code) query.transaction_code = json.transaction_code;
            if (json.transaction_order) query.transaction_order = json.transaction_order;
            if (json.location_id) query.location = json.location_id;
            if (json.organization_id) query.organization_id = json.organization_id;
            if (json.transaction_payment_type_name) query.transaction_payment_type_name = json.transaction_payment_type_name;
            if (json.transaction_cash_amount) query.transaction_cash_amount = json.transaction_cash_amount;
            if (json.transaction_cash_change) query.transaction_cash_change = json.transaction_cash_change;
            if (json.customer_attribute) query.customer_attribute = json.customer_attribute;
            if (json.connote) query.connote = json.connote;
            if (json.connote_id) query.connote_id = json.connote_id;
            if (json.origin_data) query.origin_data = json.origin_data;
            if (json.destination_data) query.destination_data = json.destination_data;
            if (json.koli_data) query.koli_data = json.koli_data;
            if (json.custom_field) query.custom_field = json.custom_field;
            if (json.currentLocation) query.currentLocation = json.currentLocation;

            if (req.params && req.params.id) where = { _id: req.params.id }

            callback(null, true)

        },
        function(data, callback) {
            APP.models.mongo.package.findOneAndUpdate(where, query).then(result => {
                if (result) {
                    output = {
                        code: 'UPDATE_OK',
                    }

                    callback(null, output)
                } else {
                    output = {
                        code: 'NOT_FOUND',
                    }

                    callback(output)
                }

            }).catch(err => {
                output = {
                    code: 'ERR_DATABASE',
                    data: err
                }
                callback(output)

            })
        }
    ], (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result)
        }
    });
};