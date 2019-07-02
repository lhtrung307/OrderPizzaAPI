const kafka = require("kafka-node");
require("dotenv").config();

try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient(config.CLOUDKARAFKA_BROKERS, {
    mechanism: "SASL",
    username: config.CLOUDKARAFKA_USERNAME,
    password: config.CLOUDKARAFKA_PASSWORD
  });
  const producer = new Producer(client);
  const kafka_topic = config.kafka_topic;
  console.log(kafka_topic);
  let payloads = [
    {
      topic: kafka_topic,
      messages: "Message sending to topic: " + config.kafka_topic
    }
  ];

  producer.on("ready", async function() {
    let push_status = producer.send(payloads, (err, data) => {
      if (err) {
        console.log(
          "[kafka-producer -> " + kafka_topic + "]: broker update failed"
        );
      } else {
        console.log(
          "[kafka-producer -> " + kafka_topic + "]: broker update success"
        );
      }
    });
  });

  producer.on("error", function(err) {
    console.log(err);
    console.log("[kafka-producer -> " + kafka_topic + "]: connection errored");
    throw err;
  });

  let result = producer.send(payloads, (err, data) => {
    if (err) {
      console.log("error:", err);
    } else {
      console.log("data:", data);
    }
  });
} catch (e) {
  console.log(e);
}
