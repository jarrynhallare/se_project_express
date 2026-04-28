
import { NON_EXISITANT, DEFAULT_ERROR, INVALID_DATA } from '../utils/errors';

const ClothingItem = require('../models/clothingItem')

const createItem = (req, res) => {
    console.log(req)
    console.log(req.body)

    const {name, weather, imageURL} = req.body;

    ClothingItem.create({name, weather, imageURL}).then((item) => {
        console.log(item);
        res.send({data:item})
    }).catch((e) => {
            res.status(DEFAULT_ERROR).send({message: 'An error has occurred on the server'})
        })
    };

    const getItems = (req, res) => {
        ClothingItem.find({}).then((items) => res.status(200).send(items))
        .catch((e) => {
            res.status(DEFAULT_ERROR).send({message: 'An error has occurred on the server'})
        })
    }

    const updateItem = (req, res) => {
        const {itemId} = req.params;
        const {imageURL} = req.body;

        ClothingItem.findByIdAndUpdate(itemId, {$set: {imageURL}})
        .orFail()
        .then((item) => res.status(200).send({data:item}))
        .catch((e) => {
            res.status(DEFAULT_ERROR).send({message: 'An error has occurred on the server'})
        })
    }

    const deleteItem = (req, res) => {
        const {itemId} = req.params;
        console.log(itemId);

        ClothingItem.findByIdAndDelete(itemId)
        .orFail()
        .then((item) => res.status(204).send({}))
        .catch((e) => {
            res.status(DEFAULT_ERROR).send({message: 'An error has occurred on the server'})
        })
    }

module.exports = {
    createItem,
    getItems,
    updateItem,
    deleteItem,

    }
