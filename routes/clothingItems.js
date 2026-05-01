const router = require("express").Router();
const { createItem, getItems, updateItem, deleteItem, likeItem, unlikeItem } = require("../controllers/clothingItem");

// Create
router.post(
    "/",
    createItem
);

// Read
router.get(
    "/",
    getItems
);

// Update
router.put(
    "/:itemId",
    updateItem
);

// Like
router.put(
    "/:itemId/likes",
    likeItem
);

// Delete
router.delete(
    "/:itemId",
    deleteItem
);

// Unlike
router.delete(
    "/:itemId/likes",
    unlikeItem
);


module.exports = router;