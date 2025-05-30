const { Router } = require("express");
const userRouter = Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { createToken } = require("../utils/authentication");

userRouter.get("/signup", (req, res) => {
  res.status(200).render("signup");
});

userRouter.get("/signin", (req, res) => {
  res.status(200).render("signin");
});

userRouter.post("/signup", async (req, res) => {
  try {
    // * password validation
    const pass = validator.isStrongPassword(req.body.password);
    if (!pass) throw new Error("invalid credential");

    // * for checking email already exist or not
    const userExists = await user.findOne({ email: req.body.email });
    if (userExists) throw new Error("Email already registered");

    // *for hashing a password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    await user.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(req.body); // * print like this 👇
    //     {
    //   fullName: 'abhishek',
    //   email: 'abhi23@gmail.com',
    //   password: '$2b$10$niTbBQIRiEReNPVQ1HdyRODh.Ya7JA6oHEZWlD70V3r1p4eqtcurO'
    //     }
    res.status(200).redirect("/");
  } catch (err) {
    res.status(404).send("Error : " + err.message);
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const existingUser = await user.findOne({ email: req.body.email });
    if (!existingUser) throw new Error("user not found ");

    const checkPass = await existingUser.verifyUser(req.body.password);
    if (!checkPass) throw new Error("invalid password");

    const token = createToken(existingUser);
    console.log(token); // ! for printing a token
    // res.cookie("token", token);

    res.status(200).cookie("token", token).redirect("/");
  } catch (err) {
    res.status(404).render("signin", {
      error: "incorrect email or password",
    });
  }
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("token"); // clear the auth token
  res.redirect("/"); // redirect to homepage or signin
});

module.exports = userRouter;
