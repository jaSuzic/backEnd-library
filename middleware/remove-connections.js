const Rent = require("../models/rent");

exports.deleteWhenRemovingBook = (req, res, next) => {
	Rent.deleteMany({
		bookId: req.params.id
	}).then(
		next()
	)
}

exports.deleteWhenRemovingMember = (req, res, next) => {
	Rent.deleteMany({
		memberId: req.params.id
	}).then(
		next()
	)
}