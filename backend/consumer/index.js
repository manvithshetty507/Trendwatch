const { Kafka } = require("kafkajs");
require("dotenv").config();

const Article = require("../models/article");
const connectMongo = require("../db/connectMongo");

const kafka = new Kafka({
  clientId: "scraper",
  brokers: ["localhost:9092"],
});

connectMongo().catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});

const consumer = kafka.consumer({ groupId: "scraper-group" });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());

      try {
        const article = new Article({ ...data });
        await article.save();
        console.log("📝 Saved to MongoDB:", article.title);
      } catch (err) {
        console.error("❌ MongoDB save error:", err.message);
      }
    },
  });
}

runConsumer().catch((err) => {
  console.error("❌ Consumer error:", err.message);
});
