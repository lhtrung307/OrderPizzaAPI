const Mongooose = require("mongoose");

const Schema = Mongooose.Schema;

const OrderSchema = new Schema({
  orderPricingRuleID: {
    type: Schema.Types.ObjectId,
    ref: "order-pricing-rule",
    required: "Must have order pricing rule id"
  },
  customerID: {
    type: Schema.Types.ObjectId,
    ref: "customer",
    required: "Must have customer id"
  },
  date: {
    type: Date,
    default: Date.now()
  },
  total: {
    type: Number,
    required: "Must have total"
  }
});

module.exports = Mongooose.model("order", OrderSchema);
