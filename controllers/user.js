const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.createNewUser = (req, res, next) => {
	bcrypt.hash(req.body.password, 10).then(
		hash => {
			const user = new User({
				email: req.body.email,
				password: hash,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				position: req.body.position
			});
			user.save().then(result => {
				res.status(201).json({
					message: 'User created',
					result: result
				})
			}).catch(err => {
				res.status(500).json({
					error: err
				})
			})
		}
	)

}

exports.loginUser = (req, res, next) => {
	let fetchedUser;
	User.findOne({
		email: req.body.email
	}).then(user => {
		if (!user) return res.status(401).json({
			message: "Auth failed"
		})
		fetchedUser = user;
		return bcrypt.compare(req.body.password, user.password)
	}).then(result => {
		if (!result) return res.status(401).json({
			message: "Auth failed"
		})
		// JWT is used now
		const token = jwt.sign({
			email: fetchedUser.email,
			userId: fetchedUser._id
		}, 'Jaksa_Suzic_App_Library_secret_key', {
			expiresIn: '8h'
		});
		res.status(200).json({
			message: "success",
			token: token,
			expiresIn: 28800,
			user: fetchedUser
		})
	}).catch(err => {
		return res.status(401).json({
			message: "Auth failed"
		})
	})
}