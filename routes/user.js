const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  getLoginUserProfile,
} = require("../controllers/userController");
const { userAuth } = require("../middleware/auth");

router.get("/profile", userAuth, getLoginUserProfile);
router.get("/:id", getUser);
router.route("/").get(getAllUsers).put(updateUser).delete(deleteUser);

module.exports = router;
