const CustomerServices = require("../services/customer-services");
const Boom = require("@hapi/boom");

module.exports.signUp = async (request, h) => {
  let customer = {
    email: request.payload.email,
    password: request.payload.password,
    name: request.payload.name,
    phone: request.payload.phone,
    dob: request.payload.dob
  };
  let createdCustomer;
  try {
    createdCustomer = await CustomerServices.createCustomer(customer);
  } catch (error) {
    return h.response(error.message);
  }
  if (createdCustomer) {
    console.log(createdCustomer);
    createdCustomer.password = undefined;
    return h.response(createdCustomer).code(200);
  } else {
    return h.response("Cannot create customer");
  }
};

module.exports.login = async (request, h) => {
  let loginData = {
    email: request.payload.email,
    password: request.payload.password
  };
  let customer;
  try {
    customer = await CustomerServices.authCustomer(loginData);
  } catch (error) {
    console.log(error);
    return Boom.unauthorized("Email or password is wrong");
  }
  if (customer) {
    customer.password = undefined;
    return h.response(customer);
  } else {
    return h.response("Login failed");
  }
};
