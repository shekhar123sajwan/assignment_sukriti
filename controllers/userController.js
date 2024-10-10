const User = require("../models/User");
const bcrypt = require("bcrypt");

//Get all users @desc
const getAllUsers = async (req, res) => {
  const users = await User.find()
    .select("-password")
    .sort([["createdAt", -1]])
    .lean();
  if (!users?.length) {
    return res.status(200).json({ data: null, message: "No users found" });
  }
  return res.status(200).json({ data: users, message: "All users" });
};

//Update User @desc
const updateUser = async (req, res) => {
  const { id, firstName, lastName, password, about } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ data: null, message: "All fields are required" });
  }

  const user = await User.findById(id).lean();

  if (!user) {
    return res.status(400).json({ data: null, message: "User not found" });
  }

  const update = { firstName: firstName, lastName: lastName, about: about };

  if (password) {
    newPass = await bcrypt.hash(password, 10);
    update.password = newPass;
  }

  const filter = { _id: id };

  const updatedUser = await User.findOneAndUpdate(filter, update);

  res
    .status(200)
    .json({ data: updatedUser, message: `${updatedUser.firstName} updated` });
};

//Delete User @desc
const deleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ data: null, message: "User ID is required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ data: null, message: "User not found" });
  }

  const result = await User.deleteOne({ _id: id });

  const reply = `Username ${user.firstName} with ID ${id} deleted`;

  res.json({ data: reply, message: "User deleted" });
};

const getUser = async (req, res) => {
  const id = req.params.id;

  const users = await User.findById(id).exec();

  if (!users) {
    return res.status(200).json({ data: null, message: "No users found" });
  }
  return res.status(200).json({ data: users, message: "User found" });
};

const getLoginUserProfile = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(200).json({ data: null, message: "No users found" });
  }
  return res.status(200).json({ data: user, message: "User found" });
};
module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  getLoginUserProfile,
};
