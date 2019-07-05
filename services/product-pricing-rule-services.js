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

  async updateProductPricingRule(pricingRuleID, pricingRuleData) {
    if (!pricingRuleID) {
      throw new Error("pricingRuleID cannot be empty");
    }
    if (!pricingRuleData) {
      throw new Error("Update data cannot be empty");
    }
    let updatedProductPricingRule = await ProductPricingRule.updateByID(
      pricingRuleID,
      pricingRuleData
    );
    if (updatedProductPricingRule) {
      if (updatedProductPricingRule.error) {
        throw updatedProductPricingRule.error;
      }
      return updatedProductPricingRule;
    }
    return null;
  }

  async deleteProductPricingRule(pricingRuleID) {
    if (!pricingRuleID) {
      throw new Error("pricingRuleId cannot be empty");
    }
    let deletedProductPricingRule = await ProductPricingRule.deleteByID(
      pricingRuleID
    );
    if (deletedProductPricingRule) {
      if (deletedProductPricingRule.error) {
        throw deletedProductPricingRule.error;
      }
      return deletedProductPricingRule;
    }
    return null;
  }
}

module.exports = new ProductPricingRuleServices();
