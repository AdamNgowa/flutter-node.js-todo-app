const mongoose = require("mongoose");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: { type: String, required: true },
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const UserModel = db.model("user", userSchema);

module.exports = UserModel;
