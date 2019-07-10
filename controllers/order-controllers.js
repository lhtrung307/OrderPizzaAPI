const OrderServices = require("../services/order-services");
const Boom = require("@hapi/boom");
const CircuitBreaker = require("opossum");
const axios = require("axios");

module.exports.create = async (request, h) => {
  try {
    options = {
      timeout: 5000, // If our function takes longer than 3 seconds, trigger a failure
      errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
      resetTimeout: 30000
    };
    let order = request.payload;
    let productInfos = order.orderDetails.map((orderDetail) => ({
      productID: orderDetail.productID,
      variants: orderDetail.variants
    }));
    let requestResult;
    // try {
    const breaker = CircuitBreaker(
      () =>
        axios.post(
          "https://pizza-products-api.glitch.me/pizzas",
          productInfos,
          {
            timeout: 1000 * 7
          }
        ),
      options
    );
    breaker.fallback(() =>
      h.response({
        error: "Unread messages currently unavailable. Try again later"
      })
    );
    // breaker.on("success", async (requestResult) => {
    //
    // });

    breaker.on("timeout", () => {
      console.log("Time out");
      h.response(`TIMEOUT: Product service is taking too long to respond.`);
    });
    breaker.on("reject", () => {
      console.log("Reject");
      h.response(
        `REJECT: The breaker for "https://pizza-products-api.glitch.me/pizzas" is open. Failing fast.`
      );
    });
    requestResult = await breaker
      .fire()
      .then((result) => result)
      .catch((error) => {
        return error;
      });

    if (requestResult.source) {
      console.log(requestResult.source);
      return Boom.serverUnavailable("Product service unavailable");
    }
    // console.log(requestResult);
    if (requestResult.data) {
      console.log(requestResult.data);
      let products;
      if (requestResult) {
        products = requestResult.data;
      }
      let createdOrder = await OrderServices.createOrder(order, products);
      if (createdOrder) {
        return h.response({ message: "Create new order successfully" });
      } else {
        return h.response("Cannot create new order");
      }
    }
    // } catch (error) {
    //   console.log(error);
    // }

    // bắt lỗi khi nhận dữ liệu từ axios
  } catch (error) {
    console.log(error.stack);
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
        return Boom.badImplementation(orders.error);
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
