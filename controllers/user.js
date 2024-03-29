const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var _ = require("lodash");

exports.createNewUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      image: req.file ? req.file.location : null
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
};

exports.loginUser = (req, res, next) => {
  const key = process.env.SECRET_KEY;
  let fetchedUser;

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result || result.statusCode === 401) {
        if (!result) {
          res.status(401).json({
            message: "Auth failed"
          });
        }
      } else {
        // JWT is used now
        const token = jwt.sign(
          {
            email: fetchedUser.email,
            userId: fetchedUser._id
          },
          key,
          {
            expiresIn: "8h"
          }
        );
        res.status(200).json({
          message: "success",
          token: token,
          expiresIn: 28800,
          user: {
            _id: fetchedUser._id,
            email: fetchedUser.email,
            firstName: fetchedUser.firstName,
            lastName: fetchedUser.lastName,
            image: fetchedUser.image,
            position: fetchedUser.position
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({
    _id: req.params.id
  })
    .then(results => {
      if (results.n > 0) {
        res.status(201).json({
          message: "User deleted"
        });
      } else {
        res.status(401).json({
          message: "There was problem with credentials, user wasn't deleted"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error happend: " + err.message
      });
    });
};

exports.updatePassword = (req, res, next) => {
  let fetchedUser;
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) return res.status(401);
      fetchedUser = user;
      return bcrypt.compare(req.body.oldPass, user.password);
    })
    .then(result => {
      if (!result)
        return res.status(401).json({
          message: "Password not correct!"
        });
      bcrypt.hash(req.body.newPass, 10).then(hash => {
        User.updateOne(
          {
            _id: fetchedUser._id
          },
          {
            password: hash
          }
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
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Error happend: " + err.message
      });
    });
};

exports.updateImage = (req, res, next) => {
  User.updateOne(
    {
      _id: req.body.id
    },
    {
      image: req.file ? req.file.location : null
    }
  )
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Image updated!"
        });
      } else {
        res.status(401).json({
          message: "Update failed"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error happend: " + err.message
      });
    });
};

exports.getUsersExcept = (req, res, next) => {
  User.find({
    $nor: [
      {
        _id: req.body.id
      }
    ]
  })
    .select("-password")
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({
          message: "Error."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error happend: " + err.message
      });
    });
};

exports.updateUser = (req, res, next) => {
  const updatedUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    position: req.body.position,
    image: req.file ? req.file.location : req.body.imagePath
  };
  User.updateOne(
    {
      _id: req.body.id
    },
    updatedUser
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
      res.status(500).json({
        message: "Error happend: " + err.message
      });
    });
};
