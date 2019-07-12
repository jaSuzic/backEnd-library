const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	birthDate: {
		type: Date,
		required: true
	}
})

module.exports = mongoose.model('Member', memberSchema);