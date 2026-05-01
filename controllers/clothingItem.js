const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  if (!name || !weather || !imageURL) {
    return res.status(400).send({ message: "Invalid data" });
  }

  return ClothingItem.create({ name, weather, imageURL })
    .then((item) => res.status(201).send(item))
    .catch(() =>
      res.status(500).send({ message: "Server error" })
    );
};

const getItems = (req, res) => {
  return ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() =>
      res.status(500).send({ message: "Server error" })
    );
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid item ID" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { imageURL },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Not found" });
      }
      return res.status(500).send({ message: "Server error" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid item ID" });
  }

  return ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Not found" });
      }
      return res.status(500).send({ message: "Server error" });
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
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Not found" });
      }
      return res.status(500).send({ message: "Server error" });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!req.user || !req.user._id) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid item ID" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Not found" });
      }
      return res.status(500).send({ message: "Server error" });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
};