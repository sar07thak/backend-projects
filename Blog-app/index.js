const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blog");

const Blog = require("./models/BlogSchema");

const main = require("./database/database");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const methodOverride = require("method-override");
const app = express();

// ✅ Set EJS as view engine and set views path
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ✅ Middlewares (order matters!)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser()); // Must be before auth middleware
app.use(checkForAuthenticationCookie("token")); // Sets req.user if token is valid
app.use(express.static(path.resolve('./public')));
app.use(methodOverride("_method"));

// ✅ Routes
app.use("/user", userRouter);
app.use("/blog", blogRouter);

// ✅ Home route
app.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.status(200).render("Home", {
      //* req.user includes the things which present in  a token 
      user: req.user, // 👈 Pass user data to EJS that user which i signin using email and password
      blogs: allBlogs, // 👈 all blog entries from DB
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
