const Book = require("../models/book");
var _ = require("lodash");

exports.getBooks = (req, res, next) => {
  let booksQuery;
  let sort = { [req.query.sortItem]: +req.query.order };
  console.log(sort);
  if (!_.isEmpty(req.query)) {
    console.log("u petlji smo", req.query);
    if (req.query.author) {
      console.log("autor je");
      booksQuery = {
        author: { $regex: ".*" + req.query.author + ".*", $options: "i" }
      };
    } else if (req.query.title) {
      console.log("title je");
      booksQuery = {
        title: { $regex: ".*" + req.query.title + ".*", $options: "i" }
      };
    } else {
      booksQuery = {};
    }
  } else {
    booksQuery = {};
  }
  let fetchedBooks;
  Book.find(booksQuery)
    //-1 desc, 1 asc: .sort({author: 1})
    .sort(sort)
    .then(books => {
      fetchedBooks = books;
      return Book.countDocuments(booksQuery);
    })
    .then(count => {
      res.status(200).json({
        message: "Books fetched successfully!",
        books: fetchedBooks,
        count: count
      });
    });
};

exports.setBook = (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year
  });
  book.save().then(result => {
    res.status(201).json({
      message: "Book added successfully."
    });
  });
};

exports.deleteBook = (req, res, next) => {
  Book.deleteOne({
    _id: req.params.id
  }).then(result => {
    if (result.n > 0) {
      res.status(201).json({
        message: "Book deleted"
      });
    } else {
      res.status(401).json({
        message: "There was error, book wasn't deleted."
      });
    }
  });
};

exports.getBook = (req, res, next) => {
  Book.findById(req.params.id).then(book => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({
        message: "Book not found"
      });
    }
  });
};

exports.updateBook = (req, res, next) => {
  const book = new Book({
    _id: req.params.id,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year
  });
  Book.updateOne(
    {
      _id: req.params.id
    },
    book
  ).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Updated successful"
      });
    } else {
      res.status(401).json({
        message: "Update failed"
      });
    }
  });
};
