const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");

router.route("/").get(getAllUsers).put(updateUser).delete(deleteUser);
router.get("/:id", getUser);

module.exports = router;
