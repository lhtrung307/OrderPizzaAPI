const CustomerControllers = require("../controllers/customer-controllers");
const Joi = require("@hapi/joi");

const Router = {
  name: "customer-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "POST",
      path: "/signup",
      options: {
        validate: {
          payload: Joi.object().keys({
            email: Joi.string()
              .email()
              .required(),
            phone: Joi.string().required(),
            name: Joi.string().required(),
            password: Joi.string().required(),
            dob: Joi.date().required()
          }),
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        },
        description: "Create new customer account",
        tags: ["api", "order-pizza", "customers"]
      },
      handler: CustomerControllers.signUp
    });

    server.route({
      method: "POST",
      path: "/login",
      options: {
        validate: {
          payload: Joi.object().keys({
            email: Joi.string()
              .email()
              .required(),
            password: Joi.string().required()
          }),
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        },
        description: "Login",
        tags: ["api", "order-pizza", "customers"]
      },
      handler: CustomerControllers.login
    });
  }
};

module.exports = Router;
