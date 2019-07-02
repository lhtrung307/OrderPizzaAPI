const OrderServices = require("../services/order-services");

module.exports.create = async (request, h) => {
  try {
    let order = request.payload;
    let createdOrder = await OrderServices.createOrder(order);
    if (createdOrder) {
      return h.response({ message: "Create new order successfully" });
    } else {
      return h.response("Cannot create new order");
    }
  } catch (error) {
    return h.response(error.message).code(500);
  }
};

module.exports.getByDate = async (request, h) => {};
