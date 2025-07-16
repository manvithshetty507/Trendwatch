const axios = require("axios");

async function hnFetcher() {
  try {
    const { data } = await axios.get(
      "https://hn.algolia.com/api/v1/search_by_date?tags=story"
    );

    const articles = data.hits.slice(0, 10).map((article) => ({
      id: article.objectID,
      title: article.title,
      author: article.author,
      url: article.url,
      points: article.points,
      created_at: article.created_at,
      source: "hackernews",
    }));

    return articles;
  } catch (err) {
    console.error("❌ Error in hnFetcher:", err.message);
    return [];
  }
}

module.exports = hnFetcher;
