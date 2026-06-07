const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../utils/config");
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

  // Validate required fields before hashing
  if (!password || password.length < 8) {
    return res.status(INVALID_DATA).send({
      message: "invalid data passed to the methods for creating an user",
    });
  }

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

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(401).send({ message: "Incorrect email or password" });
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

module.exports = { getUsers, createUser, login, getUserById };