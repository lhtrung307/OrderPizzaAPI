const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: "Category must have a name"
  },
  description: String
});

module.exports = Mongoose.model("category", CategorySchema);
