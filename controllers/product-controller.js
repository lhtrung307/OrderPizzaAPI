const Product = require("../models/product");

module.exports.list = async (request, h) => {
  try {
    const products = await Product.find({}).exec();
    return h.response(products);
  } catch (error) {
    return h.response(error).code(500);
  }
};

module.exports.detail = async () => {
  try {
    let product = await Product.findById(request.params.id);
    if (product == null) {
      return h.response({}).code(404);
    } else {
      return h.response(product);
    }
  } catch (error) {
    h.response(error).code(500);
  }
};
