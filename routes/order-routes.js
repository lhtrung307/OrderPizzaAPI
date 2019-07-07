const OrderControllers = require("../controllers/order-controllers");
const Joi = require("@hapi/joi");

const Router = {
  name: "order-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "POST",
      path: "/orders",
      options: {
        description: "Create new order",
        tags: ["api", "order-pizza", "order"],
        validate: {
          payload: Joi.object().keys({
            customerID: Joi.string().required(),
            orderDetails: Joi.array()
              .required()
              .items(
                Joi.object().keys({
                  productID: Joi.string().required(),
                  quantity: Joi.number()
                    .min(1)
                    .integer()
                    .required(),
                  variants: Joi.array().items(
                    Joi.object().keys({
                      key: Joi.string().allow("size"),
                      value: Joi.string().allow("S", "M", "L")
                    })
                  ),
                  price: Joi.number().required(),
                  type: Joi.string()
                    .required()
                    .allow("pizza", "topping")
                })
              )
          }),
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        },
        response: {
          status: {
            200: Joi.object()
              .keys({
                message: Joi.string()
              })
              .label("Result")
          }
        }
      },
      handler: OrderControllers.create
    });

    server.route({
      method: "GET",
      path: "/order-detail-report/{date}",
      options: {
        description: "Get order report from date",
        tags: ["api", "order-pizza", "order-detail"],
        validate: {
          params: { date: Joi.date().required() },
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        }
      },
      handler: OrderControllers.getByDate
    });

    server.route({
      method: "GET",
      path: "/orders/customer/{customerID}",
      options: {
        description: "Get all orders of customer",
        tags: ["api", "order-pizza", "order"],
        validate: {
          params: {
            customerID: Joi.string()
              .length(24)
              .required()
          },
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        }
      },
      handler: OrderControllers.orderHistory
    });
  }
};

module.exports = Router;
