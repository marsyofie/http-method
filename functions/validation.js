"use strict";

// const validateJS = require('validate.js');
const validator = require('validator');

exports.validate = function(req, callback) {
	var validate;

	if (req.body) {
		if (req.body.transaction_amount) {
			validate = module.exports.amount(req.body.transaction_amount);

			if (validate !== true) return callback(validate);
		}

		if (req.body.transaction_discount) {
			validate = module.exports.amount(req.body.transaction_discount);

			if (validate !== true) return callback(validate);
		}

		if (req.body.transaction_cash_amount) {
			validate = module.exports.amount(req.body.transaction_cash_amount);

			if (validate !== true) return callback(validate);
		}

		if (req.body.transaction_cash_change) {
			validate = module.exports.amount(req.body.transaction_cash_change);

			if (validate !== true) return callback(validate);
		}

		if (req.body.origin_data) {

			if (req.body.origin_data.customer_email) {
				validate = module.exports.email(req.body.origin_data.customer_email);

				if (validate !== true) return callback(validate);
			}

			if (req.body.origin_data.customer_zip_code) {
				validate = module.exports.zipcode(req.body.origin_data.customer_zip_code);

				if (validate !== true) return callback(validate);
			}

		}

		if (req.body.destination_data) {

			if (req.body.destination_data.customer_email) {
				validate = module.exports.email(req.body.origin_data.customer_email);

				if (validate !== true) return callback(validate);
			}

			if (req.body.destination_data.customer_zip_code) {
				validate = module.exports.zipcode(req.body.origin_data.customer_zip_code);

				if (validate !== true) return callback(validate);
			}
		}
	}

	return callback(null, req.body);
};

exports.take = function(num) {
	return (num && typeof num != 'number') ? { code: 'INVALID_REQUEST', info: { invalidParameter: 'take' } } : true;
};

exports.amount = function(num) {
	let pattern = new RegExp(/^(\d{1,})$/g);
	return (!pattern.test(num)) ? { code: 'INV_REQ_AMOUNT', message: `Amount Tidak Valid` } : true;
	//return (num && typeof num != 'number') ? { code: 'INVALID_REQUEST', info: { invalidParameter: 'amount' } } : true; 
};


exports.zipcode = function(num) {
	let pattern = new RegExp(/^\d{5}$/g);
	return (!pattern.test(num)) ? { code: 'INV_REQ_ZIP', message: `Input Zip Code Tidak Valid` } : true;
}

exports.skip = function(num) {
	return (num && typeof num != 'number') ? { code: 'INVALID_REQUEST', info: { invalidParameter: 'skip' } } : true;
};

exports.orderBy = function(str) {
	return (str && typeof str != 'string') ? { code: 'INVALID_REQUEST', info: { invalidParameter: 'orderBy' } } : true;
};

exports.sort = function(str) {
	return (str && typeof str != 'string') ? { code: 'INVALID_REQUEST', info: { invalidParameter: 'sort' } } : true;
};

exports.email = function(str) {
	return (str == '' || str.length < 5 || str == undefined || (str && typeof str !== 'string') ||
		(str && !/^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(str))) ? { code: 'INV_REQ_EMAIL', message: `Email Tidak Valid` } : true;
};

exports.username = function(str) {
	return (str == '' || str.length < 5 || str == undefined || (str && typeof str !== 'string') || (str && / /g).test(str) || (str && str.length > 20)) ? { code: 'INV_REQ_USERNAME', message: `invalidParameter: 'username'` } : true;
};

exports.password = function(str) {
	let pattern = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
	let pattern_symbol = new RegExp(/[\@\-\!\$\%\^\&\*\(\)\_\+\|\~\=\`\{\}\[\]\:\"\;\'\<\>\?\,\.\/]/);

	return ((str.length > 12) || (!pattern.test(str)) || (pattern_symbol.test(str))) ? { code: 'INV_REQ_PASS', message: `Password minimal 8 karakter dan maksimal 12 karakter. Password harus berisi setidaknya satu nomor, huruf besar, dan huruf kecil.` } : true;
	/*	return (str == '' || str.length < 5 || str == undefined || (str && typeof str !== 'string') || (str && / /g).test(str) || (str && str.length > 32))
			? { code: 'INVALID_REQUEST', info: { invalidParameter: 'password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters' } } : true;*/
};

exports.array = function(arr) {
	return (!validateJS.isArray(arr)) ? { code: 'INVALID_REQUEST', info: { invalidArray: arr } } : true;
};

exports.name = function(str) {
	let pattern = new RegExp(/^[A-Za-z0-9- ']+$/);
	return (!pattern.test(str)) ? { code: 'INV_REQ_NAME', message: `Nama Tidak Valid` } : true;
	//return (!validator.isAlphanumeric(str)) ? { code: 'INV_REQ_FNAME', message: `invalidParameter: 'first_name'` } : true;
};

exports.last_name = function(str) {
	let pattern = new RegExp(/^[A-Za-z0-9- ']+$/);
	return (!pattern.test(str)) ? { code: 'INV_REQ_LNAME', message: `invalidParameter: 'last_name'` } : true;
	//return (!validator.isAlphanumeric(str)) ? { code: 'INV_REQ_LNAME', message: `invalidParameter: 'last_name'` } : true;
};

exports.msisdn = function(str) {
	return (!validator.isMobilePhone(str, ['id-ID'])) ? { code: 'INV_REQ_MSISDN', message: `Nomer HP Tidak Valid` } : true;
	//return (!validator.isNumeric(str)) ? { code: 'INV_REQ_MSISDN', message: `invalidParameter: 'msisdn'` } : true;
};

exports.pin = function(str) {
	return (!validator.isNumeric(str)) ? { code: 'INV_REQ_PIN', message: `PIN Tidak Valid` } : true;
};

exports.ip = function(str) {
	return (!validator.isIP(str)) ? { code: 'INV_REQ_IP', message: `IP Tidak Valid` } : true;
};

exports.npp = function(str) {
	return (str.length > 7) ? { code: 'INV_REQ_NPP', message: `NPP Tidak Valid` } : true;
};