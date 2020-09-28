"use strict";

module.exports = function(mongo) {
	//if (mongo.models.Log) return mongo.models.Log;

	const ModelSchema = mongo.Schema({
		transaction_id: { type: String, required: true },
		customer_name: { type: String, required: true },
		customer_code: { type: String, required: true },
		transaction_amount: String,
		transaction_discount: String,
		transaction_additional_field: String,
		transaction_payment_type: String,
		transaction_state: String,
		transaction_code: String,
		transaction_order: Number,
		location_id: String,
		organization_id: Number,
		created_at: { type: Date, default: Date.now },
		updated_at: { type: Date, default: Date.now },
		transaction_payment_type_name: String,
		transaction_cash_amount: Number,
		transaction_cash_change: Number,
		customer_attribute: {},
		connote: {},
		connote_id: String,
		origin_data: {},
		destination_data: {},
		koli_data: [{}],
		custom_field: {},
		currentLocation: {}
	});

	try {
		if (mongo.model('package')) return mongo.model('package');
	} catch (e) {
		if (e.name === 'MissingSchemaError') {
			return mongo.model('package', ModelSchema, 'package');
		}
	}
};