const ProductPricingRuleControllers = require("../controllers/product-pricing-rule-controllers");
const Joi = require("@hapi/joi");
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

    server.route({
      method: "POST",
      path: "/product-pricing-rules",
      options: {
        description: "Create product pricing rules",
        tags: ["api", "order-pizza", "product-pricing-rules"],
        validate: {
          payload: Joi.object().keys({
            fromDate: Joi.date().required(),
            toDate: Joi.date().required(),
            productIDs: Joi.array()
              .items(Joi.string())
              .required(),
            discountType: Joi.string().required(),
            discount: Joi.number().required()
          })
        }
      },
      handler: ProductPricingRuleControllers.create
    });
  }
};

module.exports = Router;
