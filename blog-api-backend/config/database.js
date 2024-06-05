const { default: mongoose, model } = require("mongoose");
require("dotenv").config();

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

const connection = async () => {
  await mongoose.connect(mongoDB);
};
connection().catch((err) => console.log(err));

module.exports = connection;
