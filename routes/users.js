const router = require("express").Router();
const { getUsers, getCurrentUser, updateUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
