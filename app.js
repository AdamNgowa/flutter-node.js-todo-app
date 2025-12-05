const express = require("express");
const userRouter = require("./routes/user.route");
const todoRouter = require("./routes/todo.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", userRouter);
app.use("/", todoRouter);

module.exports = app;
