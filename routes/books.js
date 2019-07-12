const express = require('express');
const booksController = require('../controllers/book')
const router = express.Router();

router.get((''), booksController.getBooks);
router.get('/:id', booksController.getBook);
router.post('', booksController.setBook);
router.delete('/:id', booksController.deletePost);
router.put('/:id', booksController.updateBook);

module.exports = router;