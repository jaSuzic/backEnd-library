const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const s3 = new aws.S3();

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS,
	accessKeyId: process.env.AWS_KEY_ID,
	region: process.env.AWS_REGION
})

const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpg',
	'image/jpg': 'jpg'
}

const storage = multerS3({
	s3: s3,
	bucket: 'app-library-jaksa',
	metadata: function (req, file, cb) {
		cb(null, {
			fieldName: file.fieldname
		});
	},
	key: function (req, file, cb) {
		cb(null, Date.now().toString())
	}
})

module.exports = multer({
	storage: storage
}).single("image")