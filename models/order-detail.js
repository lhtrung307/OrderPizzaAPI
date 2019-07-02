const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const OrderDetailSchema = new Schema(
  {
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
      ref: "product-pricing-rule"
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
  },
  { versionKey: false }
);

const OrderDetailModel = Mongoose.model("order-detail", OrderDetailSchema);

const save = (orderDetail) =>
  OrderDetailModel.create(orderDetail)
    .then((createdOrderDetail) => createdOrderDetail)
    .catch((error) => {
      return { error };
    });

const updateByID = (id, updateData) =>
  OrderDetailModel.findByIdAndUpdate(id, updateData, { new: true })
    .then((updated) => updated)
    .catch((error) => {
      return { error };
    });

const getByOrderID = (orderID) =>
  OrderDetailModel.find({ orderID })
    .then((orderDetails) => orderDetails)
    .catch((error) => {
      return { error };
    });

module.exports = {
  OrderDetailSchema,
  OrderDetailModel,
  save,
  updateByID,
  getByOrderID
};
