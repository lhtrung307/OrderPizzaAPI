const { init } = require("../server");
const Order = require("../models/order");
const CustomerService = require("../services/customer-services");
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
  let customer;
  beforeAll(async () => {
    const newAccount = {
      email: "example@gmail.com",
      phone: "012345678910",
      name: "Example Name",
      password: "123456",
      dob: "2019-07-08"
    };
    customer = await CustomerServices.createCustomer(newAccount);
    server = await init();
  });

  beforeEach(async () => {
    await server.initialize();
    await Order.OrderModel.deleteMany({});
  });

  afterEach(async () => {
    await server.stop();
  });

  afterAll(async () => {
    await Mongoose.connection.db.dropDatabase();
    await Mongoose.disconnect();
  });

  describe("POST /orders", () => {
    it("Should return status code equal to 200", async () => {
      let order = Order.OrderModel({
        customerID: customer._id,
        orderDetails: [
          {
            productID: "string",
            quantity: 0,
            variants: [
              {
                key: "size",
                value: "S"
              }
            ],
            price: 0,
            type: "pizza"
          }
        ]
      });
    });
  });
});
