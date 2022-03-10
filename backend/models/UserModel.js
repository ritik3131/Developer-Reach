const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model("user", userSchema);
