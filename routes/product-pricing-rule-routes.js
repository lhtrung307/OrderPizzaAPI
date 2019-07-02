const ProductPricingRuleControllers = require("../controllers/product-pricing-rule-controllers");

const Router = {
  name: "category-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/product-pricing-rules",
      options: {
        description: "Get list of product pricing rules",
        tags: ["api", "order-pizza", "product-pricing-rules"]
      },
      handler: ProductPricingRuleControllers.list
    });
  }
};

module.exports = Router;
