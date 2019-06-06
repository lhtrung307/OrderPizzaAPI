const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const RateSchema = new Schema({
  customerID: {
    type: Schema.Types.ObjectId,
    ref: "customer",
    required: "Rate must have customer id"
  },
  productID: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: "Rate must have product id"
  },
  star: {
    type: Number,
    required: "Rate must have number of star"
  }
});

module.exports = Mongoose.model("rate", RateSchema);
