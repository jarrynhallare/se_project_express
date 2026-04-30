const router = require("express").Router();
const clothingItem = require("./clothingItems");
const userRouter = require("./users"),

    DEFAULT_ERROR = 500;

router.use(
    "/items",
    clothingItem
);
router.use(
    "/users",
    userRouter
);

router.use((req, res) => {

    res.status(DEFAULT_ERROR).send({"message": "An error has occurred on the server"});

});

module.exports = router;
