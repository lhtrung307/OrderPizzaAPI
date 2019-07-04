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

  async createProductPricingRule(pricingRule) {
    if (!pricingRule) {
      throw new Error("Pricing rule cannot be empty");
    }

    let createdPricingrule = await ProductPricingRule.save(pricingRule);
    if (createdPricingrule) {
      if (createdPricingrule.error) {
        throw createdPricingrule.error;
      } else {
        return createdPricingrule;
      }
    }
    return null;
  }
}

module.exports = new ProductPricingRuleServices();
