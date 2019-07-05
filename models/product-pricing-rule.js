const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const ProductPricingRuleSchema = new Schema(
  {
    fromDate: Date,
    toDate: Date,
    productIDs: [
      {
        type: Schema.Types.ObjectId,
        ref: "product"
      }
    ],
    discountType: {
      type: String,
      enum: ["percentage", "amount"]
    },
    discount: {
      type: Number,
      required: "Product Pricing Rule must have discount"
    }
  },
  { versionKey: false }
);

const ProductPricingRuleModel = Mongoose.model(
  "product-pricing-rule",
  ProductPricingRuleSchema
);

const getAll = (sortType) =>
  ProductPricingRuleModel.find({})
    .sort(sortType)
    .then((productPricingRules) => productPricingRules)
    .catch((error) => {
      return { error };
    });

const save = (productPricingRule) =>
  ProductPricingRuleModel.create(productPricingRule)
    .then((productPricingRule) => productPricingRule)
    .catch((error) => {
      return { error };
    });

const getByID = (productPricingRuleID) =>
  ProductPricingRuleModel.findById(productPricingRuleID)
    .then((productPricingRule) => productPricingRule)
    .catch((error) => {
      return { error };
    });

const updateByID = (productPricingRuleID, productPricingRule) =>
  ProductPricingRuleModel.findByIdAndUpdate(
    { _id: productPricingRuleID },
    productPricingRule,
    { new: true }
  )
    .then((productPricingRule) => productPricingRule)
    .catch((error) => {
      return { error };
    });

const deleteByID = (productPricingRuleID) =>
  ProductPricingRuleModel.findByIdAndDelete({ _id: productPricingRuleID })
    .then((productPricingRule) => productPricingRule)
    .catch((error) => {
      return { error };
    });

const getUnexpiredPricingRules = () =>
  ProductPricingRuleModel.find({}, "_id discountType discount productIDs")
    .where("toDate")
    .gt(new Date().toISOString())
    .then((productPricingRules) => productPricingRules)
    .catch((error) => {
      return { error };
    });

module.exports = {
  ProductPricingRuleSchema,
  ProductPricingRuleModel,
  getAll,
  save,
  getByID,
  updateByID,
  deleteByID,
  getUnexpiredPricingRules
};
