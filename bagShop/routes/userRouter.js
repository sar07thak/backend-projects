const { Router } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const validateUser = require("../Utils/validate");
const { tokenCreation } = require("../Utils/AuthenticationJwt");

router.post("/register", async (req, res) => {
  try {
    validateUser(req.body);

    const { fullName, email, password } = req.body;

    // ✅ Step 1: Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists. Please login 🙂");
    }

    // ✅ Step 2: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Step 3: Create the user
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // ✅ Step 4: Generate token
    const token = tokenCreation(newUser);
    // console.log(token); // ! Print token for debugging

    // ✅ Step 5: Send token in cookie
    res.status(200).cookie("token", token).send("User created successfully!");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //✅ 1. Find the user
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).send("Email or password incorrect ❌");

    //✅ 2. Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send("Email or password incorrect ❌");

    //✅ 3. Generate token
    const token = tokenCreation(user); // assuming you have a function for this
    console.log(token); // for debugging

    //✅ 4. Send token in cookie
    res.status(200).cookie("token", token).send("Login successful ✅");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});



router.get("/logout", (req, res) => {
  res.clearCookie("token"); // clear the auth token
  res.send("log out sucesssfully") // redirect to homepage or signin
});


module.exports = router;