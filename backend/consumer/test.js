const { Kafka } = require("kafkajs");

require("dotenv").config();

const kafka = new Kafka({
  clientId: "scraper",
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

async function sendTestMessage() {
  await producer.connect();

  const payload = {
    id: "test123",
    title: "Test Article",
    author: "Jane Doe",
    url: "https://example.com/test",
    points: 100,
    summary: "This is a summary.",
    image: "https://example.com/image.png",
    created_at: new Date().toISOString(),
    source: "manual",
  };

  await producer.send({
    topic: process.env.KAFKA_TOPIC || "hn-articles",
    messages: [{ value: JSON.stringify(payload) }],
  });

  console.log("✅ Test message sent to Kafka");
  await producer.disconnect();
}

sendTestMessage().catch((err) => {
  console.error("❌ Test message error:", err.message);
});
