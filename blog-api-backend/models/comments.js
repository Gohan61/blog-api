const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: Schema.Types.String, ref: "User", required: true },
  timestamp: { type: Date, required: true },
  text: { type: String, required: true, minLength: 2, maxLength: 30 },
  postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

module.exports = mongoose.model("Comments", CommentsSchema);
