const Rent = require("../models/rent");

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
    });
};

exports.setRent = (req, res, next) => {
  const rent = new Rent({
    memberId: req.body.idMember,
    bookId: req.body.idBook,
    rentDate: req.body.rentDate,
    returnDate: req.body.returnDate
  });
  rent.save().then(
    result => {
      res.status(201).json({
        message: "New rent saved" + result
      });
    },
    err => {
      console.log(err);
    }
  );
};

//I think that there is not need for deleting rent, so maybe remove this method.
exports.deleteRent = (req, res, next) => {
  Rent.deleteOne({
    _id: req.params.id
  }).then(result => {
    if (result.n > 0) {
      res.status(201).json({
        message: "Rent removed."
      });
    } else {
      res.status(401).json({
        message: "There was error, rent wasn't deleted."
      });
    }
  });
};

exports.getRent = (req, res, next) => {
  Rent.findById(req.params.id).then(rent => {
    if (rent) {
      res.status(200).json(rent);
    } else {
      res.status(404).json({
        message: "Rent not found"
      });
    }
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
  Rent.updateOne({
      _id: req.params.id
    },
    rent
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