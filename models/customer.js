const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

// consider about address field, should we save address if don't have delivery system.
const CustomerSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: "Customer must have email address."
  },
  phone: {
    type: String,
    unique: true,
    required: "Customer must have phone number"
  },
  token: {
    type: String,
    unique: true,
    required: "Customer must have token"
  }
});

module.exports = Mongoose.model("customer", CustomerSchema);
