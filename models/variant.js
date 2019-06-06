const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const VariantSchema = new Schema({
  key: {
    type: String,
    trim: true,
    unique: true,
    required: "Variant must have key"
  },
  acceptValues: {
    type: Array,
    enum: [""],
    default: [],
    required: "Variant must have accept values"
  },
  type: {
    type: String,
    enum: [""],
    required: "Variant must have type"
  },
  label: String
});

module.exports = Mongoose.model("variant", VariantSchema);
