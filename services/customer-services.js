const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");

class CustomerServices {
  async createCustomer(customer) {
    if (!customer) {
      throw new Error("Customer cannot be empty");
    }
    let result = await this.validateCustomer(customer);
    if (result.error) {
      throw result.error;
    }
    const saltRound = 10;
    let encryptedPass = await bcrypt.hash(customer.password, saltRound);
    if (encryptedPass) {
      customer.password = encryptedPass;
    }
    let savedCustomer = await Customer.save(customer);
    if (savedCustomer.error) {
      throw savedCustomer.error;
    }
    return customer;
  }

  async authCustomer(customer) {
    if (!customer) {
      throw new Error("Customer cannot be empty");
    }
    let customerRecord;
    try {
      customerRecord = await Customer.getByEmail(customer.email);
    } catch (error) {
      throw error;
    }
    if (customerRecord) {
      let result = await bcrypt.compare(
        customer.password,
        customerRecord.password
      );
      if (result.error) {
        throw result.error;
      }
      if (result) {
        return customerRecord;
      }
    } else {
      throw new Error("Email or password wrong");
    }
  }

  customerValidate() {
    return Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      dob: Joi.date().required()
    });
  }

  validateCustomer(customer) {
    return Joi.validate(customer, this.customerValidate());
  }
}

module.exports = new CustomerServices();
