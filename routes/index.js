const router = require("express").Router();
const { NON_EXISTENT } = require("../utils/errors");
const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");

router.use("/items", clothingItemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NON_EXISTENT).send({ message: "Not found" });
});

module.exports = router;