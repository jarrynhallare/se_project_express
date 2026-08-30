const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

// Create
router.post("/", createItem);

// Like (TEST EXPECTS PUT per your note)
router.put("/:itemId/likes", likeItem);

// Delete
router.delete("/:itemId", deleteItem);

// Unlike
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;