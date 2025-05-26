const path = require("path");
const express = require("express");
const app = express();
const userRouter = require("./routes/userRoute");
const main = require("./database/database");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ! MIDDLEWARES USED 
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).render("Home");
  } catch (err) {
    res.status(404).send("Error : " + err.message);
  }
});

main()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("App start and listen at port 4000");
    });
  })
  .catch((err) => {
    console.error("Error : " + err.message);
  });
