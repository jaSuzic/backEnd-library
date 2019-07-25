const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	year: Number,
	imagePath: {
		type: String,
		required: false
	}
})

module.exports = mongoose.model('Book', bookSchema);