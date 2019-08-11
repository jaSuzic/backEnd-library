const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
require("dotenv").config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  accessKeyId: process.env.AWS_KEY_ID,
  region: "us-east-2"
});

const awsS3 = new aws.S3();

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only jpg, jpeg and png allowed."), false);
  }
};

const upload = multer({
  fileFilter: imageFilter,
  storage: multerS3({
    s3: awsS3,
    bucket: "app-library-jaksa",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function(req, file, cb) {
      cb(
        null,
        "image-" + Date.now().toString() + path.extname(file.originalname)
      );
    }
  })
});

module.exports = upload.single("image");
