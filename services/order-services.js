const Orders = require("../models/order");
const OrderDetails = require("../models/order-detail");
const ProductPricingRules = require("../models/product-pricing-rule");

const Joi = require("@hapi/joi");

class OrderServices {
  async createOrder(order, products) {
    if (!order) {
      throw new Error("Order cannot be empty");
    }
    let result = this.validateOrder(order);
    if (result.error) {
      throw result.error;
    }
    let orderDetails = order.orderDetails;
    console.log(orderDetails);

    for (let i = 0; i < orderDetails.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (orderDetails[i].productID === products[j].productID) {
          if (products[j].variants) {
            orderDetails[i].price = products[j].variants.reduce(
              (sum, variant) => sum + variant.price,
              0
            );
          } else {
            orderDetails[i].price = products[j].price;
          }

          let rule = await this.getPricingRuleOfProduct(
            orderDetails[i].productID
          );
          orderDetails[i].discountAmount = this.calculateDiscountAmount(
            orderDetails[i],
            rule
          );

          orderDetails[i].total = this.calculateOrderDetailTotal(
            orderDetails[i]
          );
        }
      }
    }
    console.log(orderDetails);

    let pricingRules = await Promise.all(
      orderDetails.map(async (orderDetail) => {
        let orderDetailTotal = 0;
        return { orderDetail };
      })
    );

    let total = this.calculateOrderTotal(orderDetails);
    let orderInfo = {
      customerID: order.customerID,
      total: total
    };
    console.log(orderInfo);
    let savedOrder = await Orders.save(orderInfo);
    if (savedOrder.error) {
      throw savedOrder.error;
    } else {
      orderDetails.map((orderDetail) => {
        orderDetail.orderID = savedOrder._id;
        OrderDetails.save(orderDetail);
      });
    }
    return savedOrder;
  }

  async getPricingRuleOfProduct(productID) {
    let rules = await ProductPricingRules.getUnexpiredPricingRules();
    for (let rule of rules) {
      if (rule.productIDs.indexOf(productID) > -1) {
        return rule;
      }
    }
    return null;
  }

  calculateOrderTotal(orderDetails) {
    return orderDetails.reduce((sum, orderDetail) => {
      return sum + orderDetail.total;
    }, 0);
  }

  calculateOrderDetailTotal(orderDetail) {
    let total =
      (orderDetail.price - orderDetail.discountAmount) * orderDetail.quantity;
    return total;
  }

  calculateDiscountAmount(product, pricingRule) {
    if (pricingRule) {
      if (pricingRule.discountType === "amount") {
        return pricingRule.discount;
      } else if (pricingRule.discountType === "percentage") {
        return (pricingRule.discount * product.price) / 100;
      }
    } else {
      return 0;
    }
  }

  async getOrderByDate(date) {
    if (!date) {
      throw new Error("Date cannot be empty");
    }
    let validateResult = await Joi.validate(date, Joi.date());
    if (validateResult.error && validateResult.error.isJoi) {
      throw validateResult.error.details[0];
    }
    let orders = await Orders.getByDate(date);
    if (orders && orders.error) {
      throw orders.error;
    }
    return orders;
  }

  async getOrderOfCustomer(customerID) {
    if (!customerID) {
      throw new Error("CustomerID cannot be empty");
    }
    let validateResult = await Joi.validate(
      customerID,
      Joi.string().length(24)
    );
    console.log(validateResult);
    if (validateResult.error && validateResult.error.isJoi) {
      throw validateResult.error.details[0];
    }
    let orders = await Orders.getAllOrdersByCustomerID(customerID);
    console.log(orders);
    if (orders && orders.error) {
      throw orders.error;
    }
    return orders;
  }

  orderValidate() {
    return Joi.object().keys({
      customerID: Joi.string().required(),
      orderDetails: Joi.array()
        .required()
        .items(
          Joi.object().keys({
            productID: Joi.string().required(),
            quantity: Joi.number()
              .min(1)
              .integer()
              .required(),
            variants: Joi.array().items(
              Joi.object().keys({
                key: Joi.string(),
                value: Joi.string()
              })
            ),
            price: Joi.number().required(),
            type: Joi.string().required()
          })
        )
    });
  }

  validateOrder(order) {
    return Joi.validate(order, this.orderValidate());
  }
}

module.exports = new OrderServices();
