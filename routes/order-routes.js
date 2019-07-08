const OrderControllers = require("../controllers/order-controllers");
const Joi = require("@hapi/joi");
const validateHandle = require("./validate-handle");

const Router = {
  name: "order-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "POST",
      path: "/orders",
      options: {
        description: "Create new order",
        tags: ["api", "order"],
        validate: {
          payload: validateHandle.orderRequestSchema,
          failAction: validateHandle.handleValidateError
        },
        response: validateHandle.responseOptions(
          Joi.object()
            .keys({
              message: Joi.string()
            })
            .label("Result")
        )
      },
      handler: OrderControllers.create
    });

    server.route({
      method: "GET",
      path: "/order-detail-report/{date}",
      options: {
        description: "Get order report from date",
        tags: ["api", "order-detail"],
        validate: {
          params: {
            date: Joi.string()
              .isoDate()
              .required()
              .options({ allowUnknown: true })
          },
          failAction: validateHandle.handleValidateError
        },
        response: validateHandle.responseOptions(
          Joi.array().items(
            Joi.object().keys({
              _id: Joi.object(),
              quantity: Joi.number()
            })
          )
        )
      },
      handler: OrderControllers.getByDate
    });

    server.route({
      method: "GET",
      path: "/orders/customer/{customerID}",
      options: {
        description: "Get all orders of customer",
        tags: ["api", "order"],
        validate: {
          params: {
            customerID: Joi.string()
              .length(24)
              .required()
          },
          failAction: validateHandle.handleValidateError
        },
        response: validateHandle.responseOptions(
          validateHandle.orderResponseSchema
        )
      },
      handler: OrderControllers.orderHistory
    });
  }
};

module.exports = Router;
