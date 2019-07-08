const Joi = require("@hapi/joi");

class ValidateHandle {
  constructor() {
    this.customerSchema = Joi.object()
      .keys({
        email: Joi.string()
          .email()
          .required(),
        phone: Joi.string()
          .regex(/^[0-9]+$/, "phone numbers")
          .required(),
        name: Joi.string().required(),
        dob: Joi.date().required(),
        _id: Joi.object().required()
      })
      .options({ allowUnknown: true })
      .label("customer");

    this.signupSchema = Joi.object()
      .keys({
        email: Joi.string()
          .email()
          .required(),
        phone: Joi.string()
          .regex(/^[0-9]+$/, "phone numbers")
          .required(),
        name: Joi.string().required(),
        dob: Joi.date().required(),
        _id: Joi.object().required()
      })
      .options({ allowUnknown: true })
      .label("customer");

    this.orderRequestSchema = Joi.object().keys({
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
                key: Joi.string().allow("size"),
                value: Joi.string().allow("S", "M", "L")
              })
            ),
            price: Joi.number().required(),
            type: Joi.string()
              .required()
              .allow("pizza", "topping")
          })
        )
    });

    this.orderResponseSchema = Joi.object()
      .keys({
        _id: Joi.object(),
        date: Joi.date(),
        customerID: Joi.string(),
        total: Joi.number(),
        orderDetails: Joi.array().items(
          Joi.object().keys({
            _id: Joi.object(),
            productID: Joi.string(),
            quantity: Joi.number(),
            type: Joi.string(),
            price: Joi.number(),
            discountAmount: Joi.number(),
            total: Joi.number()
          })
        )
      })
      .label("Result");

    this.productPricingRuleResponseSchema = Joi.array().items(
      Joi.object()
        .keys({
          productIDs: Joi.array().items(Joi.object()),
          _id: Joi.object(),
          fromDate: Joi.date(),
          toDate: Joi.date(),
          discountType: Joi.string(),
          discount: Joi.number()
        })
        .options({ allowUnknown: true })
        .label("product-pricing-rule")
    );

    this.productPricingRuleRequestSchema = Joi.object().keys({
      fromDate: Joi.date().optional(),
      toDate: Joi.date().optional(),
      productIDs: Joi.array()
        .items(Joi.string())
        .optional(),
      discountType: Joi.string().optional(),
      discount: Joi.number().optional()
    });
  }

  responseOptions(schema, options) {
    return {
      status: {
        200: schema,
        500: Joi.object({
          statusCode: Joi.number().example(500),
          error: Joi.string(),
          message: Joi.string()
        }),
        ...options
      },
      failAction: this.handleValidateError
    };
  }

  handleValidateError(request, h, error) {
    return error.isJoi
      ? h.response(error.details[0]).takeover()
      : h.response(error).takeover();
  }
}

module.exports = new ValidateHandle();
