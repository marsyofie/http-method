"use strict";

const async = require('async');
const messages = require('../config/messages.json');
const moment = require('moment');
var output = {};

function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

//only print
exports.print = function(req, res, params) {
	async.waterfall([
		function generateMessage(callback) {
			let message = {
				company: {}
			};

			if (messages[params.code]) message.company = messages[params.code];

			output.code = message.company.code || params.code;
			output.message = message.company.message || params.message;
			output.data = message.company.data || params.data;

			let requestClient = isEmpty(req.body) ? JSON.stringify(req.params) : JSON.stringify(req.body)

	       /* console.log('================================================================');
	        console.log('IP             :', req.headers['x-forwarded-for'] || req.connection.remoteAddress);
	        console.log('TIMESTAMP      :', moment().format());
	        console.log('ENDPOINT       :', req.originalUrl);
	        console.log('METHOD         :', req.method);
	        console.log('======================== REQUEST ====================================');
	        console.log(requestClient);
	        console.log('======================== RESPONSE ===================================');
	        console.log(JSON.stringify(output));*/
		      
			callback(null, message);
		},
	], (err, message) => {
		return res.status(message.company.status || params.status || 200).json(output);
	});
};