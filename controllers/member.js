const Member = require("../models/member");
const moment = require("moment");

exports.getMembers = (req, res, next) => {
  const membQuery = Member.find();
  let fetchedMembers;
  membQuery
    .then(members => {
      fetchedMembers = members.map(member => {
        return {
          _id: member._id,
          birthDate: member.birthDate,
          lastName: member.lastName,
          firstName: member.name
        };
      });
      return Member.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Members fetched successfully!",
        members: fetchedMembers,
        count: count
      });
    });
};

exports.setMember = (req, res, next) => {
  const member = new Member({
    name: req.body.name,
    lastName: req.body.lastName,
    //birthDate has to be in format mm-dd-yyyy
    //so datepicker should send that format
    birthDate: new Date(req.body.birthDate)
  });
  member.save().then(result => {
    res.status(201).json({
      message: "New member added successfully. "
    });
  });
};

exports.deleteMember = (req, res, next) => {
  Member.deleteOne({
    _id: req.params.id
  }).then(result => {
    if (result.n > 0) {
      res.status(201).json({
        message: "Member deleted"
      });
    } else {
      res.status(401).json({
        message: "There was error, member wasn't deleted."
      });
    }
  });
};

exports.getMember = (req, res, next) => {
  Member.findById(req.params.id).then(member => {
    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({
        message: "Member not found."
      });
    }
  });
};

exports.updateMember = (req, res, next) => {
  const member = new Member({
    _id: req.params.id,
    name: req.body.name,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate
  });
  Member.updateOne(
    {
      _id: req.params.id
    },
    member
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
