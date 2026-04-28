import { NON_EXISITANT, DEFAULT_ERROR, INVALID_DATA } from "../utils/errors";

const user = require("../models/user");
const { NON_EXISITANT } = require("../utils/errors");

//GET /Users

const getUsers = (req, res) => {
User.find({})
.then((users) => res.status(200). send(users))
.catch((err) => {
    console.error(err);
    res.status(DEFAULT_ERROR).send({message: 'An error has occurred on the server'})
});
};

const createUser = (req, res) => {
    const { name, avatar} = req.body;

    User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
            return res.status(400).send({message: 'invalid data passed to the methods for creating an user'});
        }
        return res.status(DEFAULT_ERROR).send({message: 'An error has occurred on the server'})
    });

};

const getUserById = (req, res) => {
    const {userId} = req.params;
    User.findById(userId)
    .orfail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
        console.error(err);
        if (err.name === "DocumentNotFoundError") {
            return res.status(NON_EXISITANT).send({message: 'there is no user'});
        } 
        else if (err.name === "CastError") {
            return res.status(NON_EXISITANT).send({message: 'there is no user'});
        };
        return res.status(DEFAULT_ERROR).send({message: 'An error has occurred on the server'})
    });
};

module.exports = { getUsers, createUser, getUserById };
