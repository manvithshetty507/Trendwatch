const puppeteer = require("puppeteer");

async function techCrunchFetcher() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36"
  );

  try {
    await page.goto("https://techcrunch.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForSelector(".loop-card");

    const articles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".loop-card")).map((card) => {
        const titleEl = card.querySelector("h3.loop-card__title a");
        const categoryEl = card.querySelector(".loop-card__cat");
        const authorEl = card.querySelector(".loop-card__author");
        const timeEl = card.querySelector("time");

        return {
          title: titleEl?.innerText || "",
          url: titleEl?.href || "",
          category: categoryEl?.innerText || "",
          author: authorEl?.innerText || "",
          created_at: timeEl?.getAttribute("datetime") || "",
        };
      });
    });

    return articles.slice(0, 10);
  } catch (err) {
    console.error("❌ Error in techCrunchFetcher:", err.message);
    return [];
  } finally {
    await browser.close();
  }
}

module.exports = techCrunchFetcher;
