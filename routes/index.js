const router = require("express").Router();
const { NON_EXISTENT } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");
const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");

router.post("/signin", login);
router.post("/signup", createUser);


router.get("/items", getItems);


router.use("/items", auth, clothingItemRouter);
router.use("/users", auth, userRouter);

router.use((req, res) => {
  res.status(NON_EXISTENT).send({ message: "Not found" });
});

module.exports = router;