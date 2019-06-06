const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const ProductPricingRuleSchema = new Schema({
  fromDate: Date,
  toDate: Date,
  productIDs: [
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    }
  ],
  amount: {
    type: Number,
    required: "Product Pricing Rule must have amount to apply"
  },
  discountType: {
    type: String,
    enum: [""]
  },
  discount: {
    type: Number,
    required: "Product Pricing Rule must have discount"
  }
});

module.exports = Mongoose.model(
  "product-pricing-rule",
  ProductPricingRuleSchema
);
