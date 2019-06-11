const ProductServices = require("../services/product-services");

module.exports.list = async (request, h) => {
  try {
    const products = await ProductServices.getAllProducts();
    return h.response(products);
  } catch (error) {
    return h.response(error).code(500);
  }
};

module.exports.detail = async (request, h) => {
  try {
    let productID = request.params.id;
    let product = await ProductServices.getProductDetail(productID);
    if (product == null) {
      return h.response({}).code(404);
    } else {
      return h.response(product);
    }
  } catch (error) {
    h.response(error).code(500);
  }
};
