const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

// consider about address field, should we save address if don't have delivery system.
const CustomerSchema = new Schema(
  {
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
    // token: {
    //   type: String,
    //   unique: true,
    //   required: "Customer must have token"
    // },
    name: {
      type: String,
      required: "Customer must have name"
    },
    password: {
      type: String,
      required: "Customer must have password"
    },
    dob: {
      type: Date,
      required: "Customer must have birthday"
    }
  },
  { versionKey: false }
);

const CustomerModel = Mongoose.model("customer", CustomerSchema);

const getByID = (id) =>
  CustomerModel.find({ id })
    .then((customer) => customer)
    .catch((error) => {
      return { error };
    });

const getByEmail = (email) =>
  CustomerModel.findOne({ email })
    .then((customer) => customer)
    .catch((error) => {
      return { error };
    });

const save = (customer) =>
  CustomerModel.create(customer)
    .then((customer) => customer)
    .catch((error) => {
      return { error };
    });

module.exports = {
  CustomerSchema,
  CustomerModel,
  getByID,
  save,
  getByEmail
};
