const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");
const { INVALID_DATA, NON_EXISTENT, DEFAULT_ERROR, FORBIDDEN, UNAUTHORIZED } = require("../utils/errors");

// CREATE ITEM
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(INVALID_DATA).send({ message: "Invalid data" });
      } else {
        res.status(DEFAULT_ERROR).send({ message: "Server error" });
      }
    });
};

// GET ITEMS
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: "Server error" });
    });
};

// DELETE ITEM
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(INVALID_DATA).send({ message: "Invalid item ID" });
  }

  return ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        return res.status(FORBIDDEN).send({ message: "Forbidden" });
      }
      return ClothingItem.findByIdAndDelete(itemId).then(() => res.status(200).send(item));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NON_EXISTENT).send({ message: "Not found" });
      }
      return res.status(DEFAULT_ERROR).send({ message: "Server error" });
    });
};

// LIKE / UNLIKE
const updateLike = (req, res, method) => {
  const { itemId } = req.params;

  if (!req.user || !req.user._id) {
    return res.status(UNAUTHORIZED).send({ message: "Unauthorized" });
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(INVALID_DATA).send({ message: "Invalid item ID" });
  }

  const update =
    method === "like"
      ? { $addToSet: { likes: req.user._id } }
      : { $pull: { likes: req.user._id } };

  return ClothingItem.findByIdAndUpdate(itemId, update, { new: true })
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NON_EXISTENT).send({ message: "Not found" });
      }
      return res.status(DEFAULT_ERROR).send({ message: "Server error" });
    });
};

const likeItem = (req, res) => updateLike(req, res, "like");
const unlikeItem = (req, res) => updateLike(req, res, "unlike");

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
