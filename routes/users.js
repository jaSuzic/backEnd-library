const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const multer = require("../middleware/multer");
const checkAuth = require("../middleware/check-auth");

router.post("/login", userController.loginUser);
router.post("/register", checkAuth, multer, userController.createNewUser);
router.post("/updatePass", checkAuth, userController.updatePassword);
router.post("/getUsers", checkAuth, userController.getUsersExcept);
router.put("/updateUser", checkAuth, multer, userController.updateUser);
router.patch("/updateImage", checkAuth, multer, userController.updateImage);
router.delete("/:id", checkAuth, userController.deleteUser);

module.exports = router;

//checkAuth, multer,
