const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({ html: true });

module.exports = () => {
  const dir = path.join(__dirname, "../content/deals");
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
        tag: data.tag || "",
        meta: data.meta || "",
        was_price: data.was_price || "",
        price: data.price || "",
        cta_link: data.cta_link || "#",
        featured: !!data.featured,
        expires: data.expires || null,
        bodyHtml: md.render(content || ""),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};
