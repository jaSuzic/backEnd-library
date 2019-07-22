const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, 'Jaksa_Suzic_App_Library_secret_key');
		console.log('poziva se next')
		next();
	} catch (error) {
		res.status(401).json({
			message: "Auth failed because of JWT"
		})
	}
}