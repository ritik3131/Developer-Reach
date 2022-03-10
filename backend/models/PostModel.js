const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  userName: String,
  body: String,
  comments: [
    {
      body: String,
      userName: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      userName: String,
      createdAt: String,
    },
  ],
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("post", postSchema);
