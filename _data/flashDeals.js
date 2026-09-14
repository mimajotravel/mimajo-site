const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

module.exports = () => {
  const dir = path.join(__dirname, "../content/flash");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title || "",
        image: data.image || "",
        meta: data.meta || "",
        was_price: data.was_price || "",
        price: data.price || "",
        tier_required: data.tier_required || "Voyager",
        cta_link: data.cta_link || "#",
        week_of: data.week_of || null,
        body: (content || "").trim(),
      };
    })
    .sort((a, b) => (a.week_of < b.week_of ? 1 : -1));
};
