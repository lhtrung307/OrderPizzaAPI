const { init } = require("../server");
const CustomerServices = require("../services/customer-services");
const Customer = require("../models/customer");
const Mongoose = require("mongoose");

Mongoose.connect(
  "mongodb+srv://trung:trung123@clusterproducts-yjceb.mongodb.net/order-pizza-test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.log(error);
  });

describe("Test customer endpoints", () => {
  let server;
  beforeAll(async () => {
    server = await init();
  });

  beforeEach(async () => {
    await server.initialize();
    await Customer.CustomerModel.deleteMany({});
  });

  afterEach(async () => {
    await server.stop();
  });

  afterAll(async () => {
    await Mongoose.connection.db.dropDatabase();
    await Mongoose.disconnect();
  });

  describe("POST /signup", () => {
    it("Should return status code equal to 200", async () => {
      const injectValue = {
        email: "example@gmail.com",
        phone: "012345678910",
        name: "Example Name",
        password: "123456",
        dob: "2019-07-08"
      };
      const injectOptions = {
        method: "POST",
        url: "/signup",
        payload: injectValue
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("_id");
    });

    it("Should return error when phone contain character", async () => {
      const injectValue = {
        email: "example@gmail.com",
        phone: "0123c5678910",
        name: "Example Name",
        password: "123456",
        dob: "2019-07-08"
      };
      const injectOptions = {
        method: "POST",
        url: "/signup",
        payload: injectValue
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("message");
    });

    it("Should return error when field name is missing", async () => {
      const injectValue = {
        email: "example@gmail.com",
        phone: "012345678910",
        password: "123456",
        dob: "2019-07-08"
      };
      const injectOptions = {
        method: "POST",
        url: "/signup",
        payload: injectValue
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("message");
    });
  });

  describe("POST /login", () => {
    it("Should return status code equal to 200", async () => {
      const newAccount = {
        email: "example@gmail.com",
        phone: "012345678910",
        name: "Example Name",
        password: "123456",
        dob: "2019-07-08"
      };
      await CustomerServices.createCustomer(newAccount);
      const injectValue = {
        email: "example@gmail.com",
        password: "123456"
      };
      const injectOptions = {
        method: "POST",
        url: "/login",
        payload: injectValue
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("_id");
    });

    it("Should return error when email is missing", async () => {
      const newAccount = {
        email: "example@gmail.com",
        phone: "012345678910",
        name: "Example Name",
        password: "123456",
        dob: "2019-07-08"
      };
      await CustomerServices.createCustomer(newAccount);
      const injectValue = {
        password: "123456"
      };
      const injectOptions = {
        method: "POST",
        url: "/login",
        payload: injectValue
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("message");
    });
  });
});
