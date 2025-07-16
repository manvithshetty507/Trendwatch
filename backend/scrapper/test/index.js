const puppeteer = require("puppeteer");

const searchTerms = ["macbook", "iphone", "air conditioner"];

async function scrapeFlipkart(term) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Use direct search URL
  const searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(
    term
  )}`;
  await page.goto(searchUrl, { waitUntil: "networkidle2" });

  // Close login popup if present
  try {
    await page.waitForSelector("button._2KpZ6l._2doB4z", { timeout: 3000 });
    await page.click("button._2KpZ6l._2doB4z");
  } catch {}

  // Wait for product results
  await page.waitForSelector("a:has(div)");

  // Extract top 5 products
  const products = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a"))
      .filter((a) => a.innerText && a.href.includes("/p/")) // likely product links
      .slice(0, 5);

    return anchors.map((a) => {
      const name = a.querySelector("div")?.innerText.split("\n")[0] || "N/A";
      const price = a.innerText.match(/₹\d[\d,]*/)?.[0] || "N/A";
      const rating = a.innerText.match(/\d\.\d/)?.[0] || "N/A";

      return { name, price, rating };
    });
  });

  await browser.close();
  return { term, products };
}

(async () => {
  const results = [];

  for (const term of searchTerms) {
    console.log(`🔍 Searching: ${term}`);
    const result = await scrapeFlipkart(term);
    results.push(result);
  }

  console.log("\n🛍️ Results:");
  for (const { term, products } of results) {
    console.log(`\n📦 ${term.toUpperCase()}:`);
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   💰 Price: ${p.price}`);
      console.log(`   ⭐ Rating: ${p.rating}`);
    });
  }
})();
