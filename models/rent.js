const mongoose = require("mongoose");

const rentSchema = mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  rentDate: {
    type: Date,
    default: Date.now()
  },
  returnDate: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model("Rent", rentSchema);