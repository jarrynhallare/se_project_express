/* eslint prefer-const: "error" */
const mongoose = require("mongoose");
const { DEFAULT_ERROR, INVALID_DATA } = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");


const createItem = (req, res) => {

    console.log("REQ BODY:", req.body);

    const { name, weather, imageURL } = req.body;

    return ClothingItem.create({
        name,
        weather,
        imageURL
    })
    .then((item) => res.status(201).send({
    _id: item._id,
    name: item.name,
    weather: item.weather,
    imageURL: item.imageURL
}))
    .catch((e) => {

        console.error(e);

        if (!name || !weather || !imageURL) {
    return res.status(400).send({
        message: "Missing required fields"
    });
}

        return res.status(500).send({
            message: "An error has occurred on the server"
        });
    });
};

const getItems = (req, res) => ClothingItem.find({}).
    then((items) => res.status(200).send(items)).
    catch((e) => {

        console.error(e);

        return res.status(INVALID_DATA).send({
            "message": "invalid data passed to the methods for creating an item"
        });

    });

const updateItem = (req, res) => {

    const { itemId } = req.params;
    const { imageURL } = req.body;

    if (!imageURL) {

        return res.status(400).send({ "message": "imageURL is required" });

    }

    return ClothingItem.findByIdAndUpdate(
        itemId,
        { "$set": { imageURL } },
        {
            "new": true,
            "runValidators": true
        }
    ).
        orFail().
        then((item) => res.status(200).send(item)).
        catch((e) => {

            console.error(e);

            if (e.name === "DocumentNotFoundError") {

                return res.status(404).send({
                    "message": "Item not found"
                });

            }

            if (e.name === "CastError") {

                return res.status(400).send({
                    "message": "Invalid item ID"
                });

            }

            return res.status(DEFAULT_ERROR).send({
                "message": "An error has occurred on the server"
            });

        });

};

const deleteItem = (req, res) => {

    const { itemId } = req.params;

    return ClothingItem.findByIdAndDelete(itemId).
        orFail().
        then(() => res.status(200).send({ message: "Item deleted successfully" })).
        catch((e) => {

            console.error(e);

            if (e.name === "DocumentNotFoundError") {

                return res.status(404).send({
                    "message": "Item not found"
                });

            }

            if (e.name === "CastError") {

                return res.status(400).send({
                    "message": "Invalid item ID"
                });

            }

            return res.status(DEFAULT_ERROR).send({
                "message": "An error has occurred on the server"
            });

        });

};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  if (!req.user || !req.user._id) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid item ID" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }

      return res.status(DEFAULT_ERROR).send({
        message: "Server error",
      });
    });
};

const unlikeItem = (req, res) => {

    const { itemId } = req.params;

    return ClothingItem.findByIdAndUpdate(
        itemId,
        { "$pull": { likes: req.user._id } },
        { "new": true }
    ).
        orFail().
        then((item) => res.status(200).send(item)).
        catch((e) => {

            console.error(e);

            if (e.name === "DocumentNotFoundError") {

                return res.status(404).send({
                    "message": "Item not found"
                });

            }

            if (e.name === "CastError") {

                return res.status(400).send({
                    "message": "Invalid item ID"
                });

            }

            return res.status(DEFAULT_ERROR).send({
                "message": "An error has occurred on the server"
            });

        });

};

module.exports = {
    createItem,
    getItems,
    updateItem,
    deleteItem,
    likeItem,
    unlikeItem
};