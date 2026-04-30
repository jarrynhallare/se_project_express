const { DEFAULT_ERROR } = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  if (!name || !weather || !imageURL) {
    return res.status(400).send({
      message: "Missing required fields: name, weather, imageURL",
    });
  }

  return ClothingItem.create({ name, weather, imageURL })
    .then((item) => res.status(201).send({ data: item }))
    .catch((e) => {
  console.error(e);

  let status = DEFAULT_ERROR;
  let message = "An error has occurred on the server";

  if (e.name === "ValidationError") {
    status = 400;
    message = `Invalid data: ${e.message}`;
  }

  return res.status(status).send({ message });
});
};

const getItems = (req, res) => {
  return ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((e) => {
      console.error(e);

      let status = DEFAULT_ERROR;
      let message = "An error has occurred on the server";

      return res.status(status).send({ message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  if (!imageURL) {
    return res.status(400).send({ message: "imageURL is required" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $set: { imageURL } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
  console.error(e);

  let status = DEFAULT_ERROR;
  let message = "An error has occurred on the server";

  if (e.name === "DocumentNotFoundError") {
    status = 404;
    message = "Item not found";
  } else if (e.name === "CastError") {
    status = 400;
    message = "Invalid item ID";
  }

  return res.status(status).send({ message });
});
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  return ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(204).send({}))
    .catch((e) => {
  console.error(e);

  let status = DEFAULT_ERROR;
  let message = "An error has occurred on the server";

  if (e.name === "DocumentNotFoundError") {
    status = 404;
    message = "Item not found";
  } else if (e.name === "CastError") {
    status = 400;
    message = "Invalid item ID";
  }

  return res.status(status).send({ message });
});
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};