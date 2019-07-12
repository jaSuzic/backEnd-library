const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	author: {
		type: String,
		require: true,
	},
	year: Number,
})

module.exports = mongoose.model('Book', bookSchema);