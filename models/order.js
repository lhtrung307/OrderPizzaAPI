const Mongooose = require("mongoose");

const Schema = Mongooose.Schema;

const OrderSchema = new Schema(
  {
    orderPricingRuleID: {
      type: Schema.Types.ObjectId,
      ref: "order-pricing-rule"
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
  },
  { versionKey: false }
);

const OrderModel = Mongooose.model("order", OrderSchema);

const save = (order) => OrderModel.create(order);

module.exports = {
  OrderSchema,
  OrderModel,
  save
};
