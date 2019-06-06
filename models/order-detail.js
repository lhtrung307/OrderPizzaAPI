const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const OrderDetailSchema = new Schema({
  orderID: {
    type: Schema.Types.ObjectId,
    ref: "order",
    required: "Order detail must have order id"
  },
  productID: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: "Order detail must have product id"
  },
  productPricingRuleID: {
    type: Schema.Types.ObjectId,
    ref: "product-pricing-rule",
    required: "Order detail must have product pricing rule id"
  },
  quantity: {
    type: Number,
    required: "Order detail must have quantity"
  },
  price: {
    type: Number,
    required: "Order detail must have price"
  },
  total: {
    type: Number,
    required: "Order detail must have total"
  },
  discountAmount: {
    type: Number,
    required: "Order detail must have discount amount"
  }
});

module.exports = Mongoose.model("order-detail", OrderDetailSchema);
