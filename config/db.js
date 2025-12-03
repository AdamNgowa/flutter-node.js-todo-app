const mongoose = require("mongoose");

const connection = mongoose
  .createConnection("mongodb://192.168.100.2:27017/ToDoApp")
  .on("open", () => {
    console.log("MongoDb connected successfully");
  })
  .on("error", () => {
    console.log("MongoDb connection error");
  });

module.exports = connection;
