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
                      key: Joi.string(),
                      value: Joi.string()
                    })
                  ),
                  price: Joi.number().required(),
                  type: Joi.string().required()
                })
              )
          }),
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
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
  }
};

module.exports = Router;
