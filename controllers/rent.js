const Rent = require("../models/rent");
const mongoose = require("mongoose");

exports.getRents = (req, res, next) => {
  const rentQuery = Rent.find()
    .populate("bookId")
    .populate("memberId");
  let fetchedRents;
  rentQuery
    .then(rents => {
      fetchedRents = rents;
      return Rent.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Rents fetched successfully!",
        rents: fetchedRents,
        count: count
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Error happend: " + err.message });
    });
};

exports.getActiveRents = (req, res, next) => {
  const rentQuery = Rent.find({
    returnDate: null
  })
    .populate("bookId")
    .populate("memberId");
  let fetchedRents;
  rentQuery
    .then(rents => {
      fetchedRents = rents;
      return Rent.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Rents fetched successfully!",
        rents: fetchedRents,
        count: count
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Error happend: " + err.message });
    });
};

exports.setRent = (req, res, next) => {
  const rent = new Rent({
    memberId: req.body.idMember,
    bookId: req.body.idBook,
    rentDate: req.body.rentDate,
    returnDate: req.body.returnDate
  });
  rent
    .save()
    .then(
      result => {
        res.status(201).json({
          message: "New rent saved" + result
        });
      },
      err => {
        console.log(err);
      }
    )
    .catch(err => {
      res.status(500).json({ message: "Error happend: " + err.message });
    });
};

//I think that there is not need for deleting rent, so maybe remove this method.
exports.deleteRent = (req, res, next) => {
  Rent.deleteOne({
    _id: req.params.id
  })
    .then(result => {
      if (result.n > 0) {
        res.status(201).json({
          message: "Rent removed."
        });
      } else {
        res.status(401).json({
          message: "There was error, rent wasn't deleted."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error happend: " + err.message });
    });
};

exports.getRent = (req, res, next) => {
  Rent.findById(req.params.id)
    .then(rent => {
      if (rent) {
        res.status(200).json(rent);
      } else {
        res.status(404).json({
          message: "Rent not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error happend: " + err.message });
    });
};

exports.updateRent = (req, res, next) => {
  const rent = new Rent({
    _id: req.params.id,
    memberId: req.body.idMember,
    bookId: req.body.idBook,
    rentDate: req.body.rentDate,
    returnDate: req.body.returnDate
  });
  Rent.updateOne(
    {
      _id: req.params.id
    },
    rent
  )
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Updated successful"
        });
      } else {
        res.status(401).json({
          message: "Update failed"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error happend: " + err.message });
    });
};
exports.returnBook = (req, res, next) => {
  Rent.updateOne(
    {
      _id: req.body.id
    },
    {
      returnDate: req.body.returnDate
    }
  )
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Book returned"
        });
      } else {
        res.status(401).json({
          message: "Update failed"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error happend: " + err.message });
    });
};

exports.history = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.body.memberId);
  Rent.find({
    memberId: id
  })
    .sort({ rentDate: -1 })
    .populate("bookId")
    .then(result => {
      if (result) {
        res.status(200).json({
          rents: result
        });
      } else {
        res.status(404).json({
          message: "User not found or don't have any rents"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error happend: " + err.message });
    });
};
