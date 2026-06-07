const router = require("express").Router();
const { getUsers, createUser, login, getUserById } = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", login);
router.get("/:userId", getUserById);

module.exports = router;
