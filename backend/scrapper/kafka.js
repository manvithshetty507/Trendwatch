const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "scraper",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function sendToKafka(message) {
  try {
    await producer.connect();
    await producer.send({
      topic: process.env.KAFKA_TOPIC,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  } catch (error) {
    console.error("Error sending message to Kafka:", error);
  }
  await producer.disconnect();
}

module.exports = { sendToKafka };

/*

To get the topics -> docker run --rm --network host confluentinc/cp-kafka:7.5.0 kafka-topics --bootstrap-server localhost:9092 --list

To Consume data -> docker run --rm --network host confluentinc/cp-kafka:7.5.0 kafka-console-consumer --bootstrap-server localhost:9092 --topic hn-articles --from-beginning

To delete -> docker run --rm --network host confluentinc/cp-kafka:7.5.0 kafka-topics --bootstrap-server localhost:9092 --delete --topic hn-articles

*/
