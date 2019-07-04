const ProductPricingRuleServices = require("../services/product-pricing-rule-services");
const Boom = require("@hapi/boom");

module.exports.list = async (request, h) => {
  let query = request.query;
  let sortType;
  if (query.sort && (query.sort === 1 || query.sort === -1)) {
    sortType = query.sort;
  }
  try {
    const productPricingRules = ProductPricingRuleServices.getAllProductPricingRules(
      sortType
    );
    if (productPricingRules) {
      return h.response(productPricingRules).code(200);
    } else {
      return h.response({
        message: "You don't have any Product Pricing Rule."
      });
    }
  } catch (error) {
    return h.response(error.message).code(500);
  }
};

module.exports.create = async (request, h) => {
  let pricingRule = request.payload;
  try {
    let createdPricingRule = await ProductPricingRuleServices.createProductPricingRule(
      pricingRule
    );
    if (createdPricingRule) {
      return h.response(createdPricingRule);
    }
    return h.response("Cannot create pricing rule");
  } catch (error) {
    return Boom.badImplementation(error);
  }
};
