const { Router } = require("express");
const userRouter = Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
    const eid = await user.findOne({ email : req.body.email });
    if( !(eid)) throw new Error("user not found ");

    
    const checkPass = await eid.verifyUser(req.body.password);
    if (!checkPass) throw new Error("invalid password");
    
     res.status(200).redirect("/");
     
  } catch (err) {
    res.status(404).send("Errpr : " + err.message);
  }
});

module.exports = userRouter;
