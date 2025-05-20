const express = require("express");
const app = express();
const main = require("./database/database");
const userTodo = require("./models/schemaList");

app.use(express.json());


app.get("/todos", async (req, res) => {
  try {
    const todos = await userTodo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const task = await userTodo.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await userTodo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const updated = await userTodo.findByIdAndUpdate(
      req.params.id,
      { completed: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

main()
  .then(() => {
    app.listen(500, () => {
      console.log("db connected");
      console.log("server listen at port 500");
    });
  })
  .catch((err) => console.error("Error" + err.message()));
