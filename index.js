const Mongoose = require("mongoose");
const { start } = require("./server");

Mongoose.connect(
  "mongodb+srv://trung:trung123@clusterorder-fgydm.mongodb.net/order-pizza?retryWrites=true&w=majority",
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

start();
