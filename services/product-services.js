const Products = require("../models/product");

module.exports.getAllProducts = () => {
  return Products.find();
};

module.exports.getProductDetail = (id) => {
  return Products.findById(id);
};
