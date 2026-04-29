const { DEFAULT_ERROR } = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  if (!name || !weather || !imageURL) {
    return res.status(400).send({ message: "Missing required fields: name, weather, imageURL" });
  }

  return ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      if (e.name === "ValidationError") {
        return res.status(400).send({ message: `Invalid data: ${e.message}` });
      }
      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const getItems = (req, res) => {
  return ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.error(e);
      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  if (!imageURL) {
    return res.status(400).send({ message: "imageURL is required" });
  }

   return ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } }, { new: true })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.error(e);
      if (e.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  return ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(204).send({}))
    .catch((e) => {
      console.error(e);
      if (e.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.status(DEFAULT_ERROR).send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,

    };