const ProductPricingRuleControllers = require("../controllers/product-pricing-rule-controllers");
const Joi = require("@hapi/joi");
const validateHandle = require("./validate-handle");

const Router = {
  name: "category-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/product-pricing-rules",
      options: {
        description: "Get list of product pricing rules",
        tags: ["api", "product-pricing-rules"],
        response: validateHandle.responseOptions(
          validateHandle.productPricingRuleResponseSchema
        )
      },
      handler: ProductPricingRuleControllers.list
    });

    server.route({
      method: "POST",
      path: "/product-pricing-rules",
      options: {
        description: "Create product pricing rules",
        tags: ["api", "product-pricing-rules"],
        validate: {
          payload: validateHandle.productPricingRuleRequestSchema
        },
        response: validateHandle.responseOptions(
          validateHandle.productPricingRuleObjectResponseSchema
        )
      },
      handler: ProductPricingRuleControllers.create
    });

    server.route({
      method: "PUT",
      path: "/product-pricing-rules/{id}",
      options: {
        description: "Update product pricing rules by id",
        tags: ["api", "product-pricing-rules"],
        validate: {
          params: { id: Joi.string().required() },
          payload: validateHandle.productPricingRuleRequestSchema,
          failAction: validateHandle.handleValidateError
        },
        response: validateHandle.responseOptions(
          validateHandle.productPricingRuleObjectResponseSchema
        )
      },
      handler: ProductPricingRuleControllers.update
    });

    server.route({
      method: "DELETE",
      path: "/product-pricing-rules/{id}",
      options: {
        description: "Delete product pricing rules by id",
        tags: ["api", "product-pricing-rules"],
        validate: {
          params: {
            id: Joi.string().required()
          },
          failAction: validateHandle.handleValidateError
        },
        response: validateHandle.responseOptions(
          validateHandle.productPricingRuleObjectResponseSchema
        )
      },
      handler: ProductPricingRuleControllers.delete
    });
  }
};

module.exports = Router;
