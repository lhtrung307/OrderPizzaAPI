const Mongoose = require("mongoose");
const { start } = require("./server");

Mongoose.connect("mongodb://localhost:27017/order-pizza", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.log(error);
  });

start();
