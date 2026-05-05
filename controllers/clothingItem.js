const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");

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
        res.status(400).send({ message: "Invalid data" });
      } else {
        res.status(500).send({ message: "Server error" });
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
      res.status(500).send({ message: "Server error" });
    });
};

// DELETE ITEM
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).send({ message: "Invalid item ID" });
    return;
  }

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "Not found" });
      } else {
        res.status(500).send({ message: "Server error" });
      }
    });
};

// LIKE / UNLIKE
const updateLike = (req, res, method) => {
  const { itemId } = req.params;

  if (!req.user || !req.user._id) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).send({ message: "Invalid item ID" });
    return;
  }

  const update =
    method === "like"
      ? { $addToSet: { likes: req.user._id } }
      : { $pull: { likes: req.user._id } };

  ClothingItem.findByIdAndUpdate(itemId, update, { new: true })
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(404).send({ message: "Not found" });
      } else {
        res.status(500).send({ message: "Server error" });
      }
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