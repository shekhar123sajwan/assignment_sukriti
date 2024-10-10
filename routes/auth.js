const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");

router.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    req.body.password = passwordHash;

    const user = new User(req.body);
    await user.save();
    res.status(200).json({ message: "User created successfully", data: user });
  } catch (err) {
    res.status(400).json({ message: err.message, data: null });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({ data: [], message: "User not found" }).status(404);
    }

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (!isPassMatch) {
      res.json({ data: [], message: "Invalid credentials" }).status(401);
    } else {
      const token = await jwt.sign(
        {
          user: user,
        },
        "devtinder",
        { expiresIn: "7D" }
      );

      res.cookie("token", token, {
        maxAge: 24 * 7 * 60 * 60 * 1000,
      });

      const userObj = Object.assign({}, user._doc);
      userObj.token = token;
      res
        .json({ data: userObj, message: "Logged in successfully" })
        .status(200);
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

router.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.json({ data: [], message: "Logged out successfully" }).status(200);
});
module.exports = router;
