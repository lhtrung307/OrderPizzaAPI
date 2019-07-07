const OrderServices = require("../services/order-services");
const Boom = require("@hapi/boom");

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
    return Boom.badImplementation(error);
  }
};

module.exports.getByDate = async (request, h) => {
  try {
    let date = request.params.date;
    let orders = await OrderServices.getOrderByDate(date);
    return h.response(orders);
  } catch (error) {
    return Boom.badImplementation(error);
  }
};

module.exports.orderHistory = async (request, h) => {
  try {
    let customerID = request.params.customerID;
    let orders = await OrderServices.getOrderOfCustomer(customerID);
    if (orders) {
      if (orders.error) {
        return h.response(orders.error);
      } else {
        return h.response(orders);
      }
    } else {
      return h.response({ message: "Customer doesn't have any order" });
    }
  } catch (error) {
    return Boom.badImplementation(error);
  }
};
