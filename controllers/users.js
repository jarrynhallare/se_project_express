const bcrypt = require("bcryptjs");
const { DEFAULT_ERROR, INVALID_DATA, NON_EXISTENT } = require("../utils/errors");
const User = require("../models/user");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      })
        .then((user) => res.status(201).send(user))
        .catch((err) => {
          console.error(err);
          if (err.name === "ValidationError") {
            return res.status(INVALID_DATA).send({
              message: "invalid data passed to the methods for creating an user",
            });
          }

          if (err.code === 11000) {
            return res.status(409).send({ message: "Email already exists" });
          }

          return res
            .status(DEFAULT_ERROR)
            .send({ message: "An error has occurred on the server" });
        });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NON_EXISTENT).send({ message: "there is no user" });
      }

      if (err.name === "CastError") {
        return res.status(INVALID_DATA).send({ message: "Invalid user ID" });
      }

      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { getUsers, createUser, getUserById };