const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(200).json({ message: "New User created", user_id: newUser._id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ meassage: "Password does not match" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret_key, {
      expiresIn: "1hr",
    });

    res.status(200).json({ token, userId: user._id });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;