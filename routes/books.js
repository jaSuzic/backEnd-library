const express = require("express");
const booksController = require("../controllers/book");
const router = express.Router();
const multer = require('../middleware/multer')

router.get("", booksController.getBooks);
router.get("/:id", booksController.getBook);
router.post("", multer, booksController.setBook);
router.delete("/:id", booksController.deleteBook);
router.put("/:id", multer, booksController.updateBook);

module.exports = router;