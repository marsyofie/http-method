"use strict";

const async = require('async');
const fs = require('fs');

module.exports = function(db, callback) {
	async.parallel([
		function getMongoModel(callback) {
			fs.readdir(__dirname + '/../models/mongo', (err, files) => {
				var len = files.length;
				var lenX = len - 1;
				var n = 0;
				let models = {};

				files.map(model => {
					if (model.match('.js')) {
						var Model = require('../models/mongo/' + model);
						var modelName = model.replace('.js', '');

						models[modelName] = Model(db.mongo);

						if (n === lenX) return callback(null, models);
					}

					n++;
				});
			});
		}
	], (err, result) => {
		if (err) return callback(err);

		let models = {};
		// models.mysql = result[0];
		models.mongo = result[0];

		return callback(null, models);
	});
};