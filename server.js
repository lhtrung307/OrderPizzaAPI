const Hapi = require("@hapi/hapi");
const HapiSwagger = require("hapi-swagger");
const Inert = require("inert");
const Vision = require("vision");
const Pack = require("./package.json");

const orderRouter = require("./routes/order-routes");
const customerRouter = require("./routes/customer-routes");
const productPricingRuleRouter = require("./routes/product-pricing-rule-routes");
const port = process.env.PORT || 3001;
const server = Hapi.server({
  port,
  host: "0.0.0.0",
  routes: {
    cors: true
  }
});

exports.init = async () => {
  await server.register([
    {
      plugin: orderRouter
    },
    {
      plugin: customerRouter
    },
    {
      plugin: productPricingRuleRouter
    }
  ]);
  return server;
};

exports.start = async () => {
  await exports.init();
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: "Pizza Order Endpoints",
          version: Pack.version
        }
      }
    }
  ]);
  await server.start();
  console.log(`Server running at ${server.info.uri}`);
  return server;
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
