require("dotenv").config();

const axios = require("axios");
const { sendToKafka } = require("./kafka");

const hnFetcher = require("./fetchers/hnFetcher");
const devtoFetcher = require("./fetchers/devtoFetcher");
const techCrunchFetcher = require("./fetchers/techCrunchFetcher");

const fetchers = [hnFetcher, devtoFetcher, techCrunchFetcher];
(async () => {
  try {
    const results = await Promise.all(fetchers.map((fetcher) => fetcher()));

    // 🔃 Step 3: Flatten the array of arrays (articles)
    const allArticles = results.flat();

    for (let article of allArticles) {
      await sendToKafka(article);
    }

    console.log(`✅ Sent ${allArticles.length} articles to Kafka`);
  } catch (error) {
    console.error("❌ Error in fetching articles:", error.message);
  }
})();
