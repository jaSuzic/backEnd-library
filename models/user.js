const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	position: {
		type: String,
		required: true,
		enum: ['librarian', 'admin', 'super-admin'],
		lowercase: true,
		trim: true
	},
	image: {
		type: String,
		required: false,
	}
});

userSchema.plugin(unique);

module.exports = mongoose.model('User', userSchema);