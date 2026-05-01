const router = require("express").Router();
const clothingItem = require("./clothingItems");
const userRouter = require("./users");

const DEFAULT_ERROR = 500;

router.use(
    "/items",
    clothingItem
);
router.use(
    "/users",
    userRouter
);

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
