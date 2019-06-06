const Joi = require("joi");

const Router = {
  name: "product-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/products",
      options: {
        description: "Get list of products",
        tags: ["api", "order-pizza", "product"]
      },
      handler: () => {}
    });
    server.route({
      method: "GET",
      path: "/products/{id}",
      options: {
        description: "Get product detail by id",
        tags: ["api", "order-pizza", "product"]
      },
      handler: () => {}
    });
  }
};
