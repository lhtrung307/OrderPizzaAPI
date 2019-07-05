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

    server.route({
      method: "PUT",
      path: "/product-pricing-rules/{id}",
      options: {
        description: "Update product pricing rules by id",
        tags: ["api", "order-pizza", "product-pricing-rules"],
        validate: {
          params: { id: Joi.string().required() },
          payload: Joi.object().keys({
            fromDate: Joi.date().optional(),
            toDate: Joi.date().optional(),
            productIDs: Joi.array()
              .items(Joi.string())
              .optional(),
            discountType: Joi.string().optional(),
            discount: Joi.number().optional()
          }),
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        }
      },
      handler: ProductPricingRuleControllers.update
    });

    server.route({
      method: "DELETE",
      path: "/product-pricing-rules/{id}",
      options: {
        description: "Delete product pricing rules by id",
        tags: ["api", "order-pizza", "product-pricing-rules"],
        validate: {
          params: {
            id: Joi.string().required()
          },
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        }
      },
      handler: ProductPricingRuleControllers.delete
    });
  }
};

module.exports = Router;
