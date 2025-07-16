const axios = require("axios");

async function devtoFetcher() {
  try {
    const { data } = await axios.get(
      "https://dev.to/api/articles?tag=javascript&per_page=10"
    );

    const articles = data.map((article, index) => ({
      id: `devto-${article.id || index}`,
      title: article.title,
      url: article.url,
      author: article.user?.name || "Unknown",
      description: article.description,
      published_at: article.published_at,
      image: article.social_image,
      source: "devto",
    }));

    return articles;
  } catch (err) {
    console.error("❌ Error in devtoFetcher:", err.message);
    return [];
  }
}

module.exports = devtoFetcher;
