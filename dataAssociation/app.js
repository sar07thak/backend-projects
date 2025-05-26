const express = require("express");
const app = express();
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index", { username: "Sarthak" });
});

app.listen(5000, () => {
  console.log("server listen at 5000");
});
