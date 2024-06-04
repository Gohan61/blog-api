const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  authorID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true, minLength: 5, maxLength: 50 },
  text: { type: String, required: true, minLength: 20 },
  published: { type: Boolean, required: true },
});

module.exports = mongoose.model("Post", PostsSchema);
