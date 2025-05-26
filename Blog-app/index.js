const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoute");
const main = require("./database/database");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();

// ✅ Set EJS as view engine and set views path
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ✅ Middlewares (order matters!)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser()); // Must be before auth middleware
app.use(checkForAuthenticationCookie("token")); // Sets req.user if token is valid

// ✅ Routes
app.use("/user", userRouter);

// ✅ Home route
app.get("/", (req, res) => {
  try {
    res.status(200).render("Home", {
      user: req.user , // Pass user data to EJS
    });
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
});

// ✅ Connect DB and start server
main()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("App started and listening at port 4000");
    });
  })
  .catch((err) => {
    console.error("DB Connection Error: " + err.message);
  });
