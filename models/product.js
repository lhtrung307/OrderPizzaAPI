const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const ProductSchema = new Schema({
  type: {
    type: String,
    enum: ["pizza", "topping"],
    required: "Product must have type"
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: "Must have category id"
  },
  variantIDs: [
    {
      type: Schema.Types.ObjectId,
      ref: "variant",
      required: "Must have variant ids"
    }
  ],
  name: {
    type: String,
    trim: true,
    required: "Product must have name"
  },
  description: String,
  price: Number,
  variantProducts: [
    {
      key: {
        type: String,
        trim: true,
        unique: true,
        required: "Variant product must have key"
      },
      value: {
        type: String,
        required: "Variant product must have value"
      },
      price: {
        type: Number,
        required: "Variant product must have price"
      }
    }
  ]
});

module.exports = Mongoose.model("product", ProductSchema);
