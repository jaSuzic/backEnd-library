const mongoose = require('mongoose');

const rentSchema = mongoose.Schema({
	memberId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member',
		require: true,
	},
	bookId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book",
		require: true,
	},
	rentDate: {
		type: Date,
		default: Date.now()
	},
	returnDate: {
		type: Date,
		require: false,
	}
})

module.exports = mongoose.model('Rent', rentSchema);