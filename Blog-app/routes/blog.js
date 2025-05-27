const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/BlogSchema");

const blogRouter = Router();

// File upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Render blog form
blogRouter.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

// Handle form submission
blogRouter.post("/add-new", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, body } = req.body;

    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`,
    });

    console.log(req.body)
    // res.redirect(`/blog/${blog._id}`);
    res.redirect("/");
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).send("Something went wrong.");
  }
});

module.exports = blogRouter;
