const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const multer = require('../middleware/multer')

router.post('/login', userController.loginUser);
router.post('/register', multer, userController.createNewUser);
router.post('/updatePass', userController.updatePassword);

module.exports = router;