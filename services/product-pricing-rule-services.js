const ProductPricingRule = require("../models/product-pricing-rule");

class ProductPricingRuleServices {
  async getAllProductPricingRules(sortType) {
    let sort;
    if (!sortType && (sortType !== 1 || sortType !== -1)) {
      console.log(sortType);
      sort = {};
    } else {
      sort = { toDate: sortType };
    }
    let productPricingRules = await ProductPricingRule.getAll();
    if (productPricingRules.error) {
      throw productPricingRules.error;
    }
    return productPricingRules;
  }
}

module.exports = new ProductPricingRuleServices();
