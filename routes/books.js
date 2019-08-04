const express = require("express");
const booksController = require("../controllers/book");
const router = express.Router();
const multer = require("../middleware/multer");
const checkAuth = require("../middleware/check-auth");

router.get("", checkAuth, booksController.getBooks);
router.get("/:id", checkAuth, booksController.getBook);
router.post("", checkAuth, multer, booksController.setBook);
router.delete("/:id", checkAuth, booksController.deleteBook);
router.put("/:id", checkAuth, multer, booksController.updateBook);

module.exports = router;
