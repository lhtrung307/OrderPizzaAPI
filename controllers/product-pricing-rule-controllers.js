const ProductPricingRuleServices = require("../services/product-pricing-rule-services");
const Boom = require("@hapi/boom");

let Kafka = require("node-rdkafka");
require("dotenv").config();

let kafkaConf = {
  "group.id": "cloudkarafka-pricingrules",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  debug: "generic,broker,security"
};

const prefix = process.env.CLOUDKARAFKA_TOPIC_PREFIX;
const topic = `${prefix}updatePricingRule`;
const producer = new Kafka.Producer(kafkaConf);
const maxMessages = 20;

const genMessage = (pricingRule) => {
  let message = JSON.stringify(pricingRule)
  return Buffer.from(message);
}

// producer.on("ready", function(arg) {
//   console.log(`producer ${arg.name} ready.`);
//   for (var i = 0; i < maxMessages; i++) {
//     producer.produce(topic, -1, genMessage(i), i);
//   }
//   setTimeout(() => producer.disconnect(), 0);
// });

producer.on("disconnected", function(arg) {
  console.log("Sent")
});

producer.on("event.error", function(err) {
  console.error(err);
  process.exit(1);
});
producer.on("event.log", function(log) {
  console.log(log);
});



module.exports.list = async (request, h) => {
  let query = request.query;
  let sortType;
  if (query.sort && (query.sort === 1 || query.sort === -1)) {
    sortType = query.sort;
  }
  try {
    const productPricingRules = ProductPricingRuleServices.getAllProductPricingRules(
      sortType
    );
    if (productPricingRules) {
      return h.response(productPricingRules).code(200);
    } else {
      return h.response({
        message: "You don't have any Product Pricing Rule."
      });
    }
  } catch (error) {
    return h.response(error.message).code(500);
  }
};

module.exports.create = async (request, h) => {
  let pricingRule = request.payload;
  try {
    let createdPricingRule = await ProductPricingRuleServices.createProductPricingRule(
      pricingRule
    );
    if (createdPricingRule) {
      producer.connect();
      producer.on("ready", function(arg) {
        console.log(`producer ${arg.name} ready.`);
        producer.produce(topic, -1, genMessage(pricingRule), "key");
        setTimeout(() => producer.disconnect(), 0);
      });   
      console.log("hello")   
      return h.response(createdPricingRule);
    }
    return h.response("Cannot create pricing rule");
  } catch (error) {
    return Boom.badImplementation(error);
  }
};
