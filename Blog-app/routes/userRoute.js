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
    const pass = validator.isStrongPassword(req.body.password);
    if (!pass) throw new Error("invalid credential");

    req.body.password = await bcrypt.hash(req.body.password, 10);
    await user.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(req.body);
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
    // console.log(token);  // ! for printing a token
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
  res.redirect("/");        // redirect to homepage or signin
});

module.exports = userRouter;
