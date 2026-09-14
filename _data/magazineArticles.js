const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({ html: true });

const TAG_CLASS = {
  "Destination Guide": "mag-tag-ma",
  "Budget Tips": "mag-tag-mi",
  "Travel Hacks": "mag-tag-jo",
  Packing: "mag-tag-jo",
};

module.exports = () => {
  const dir = path.join(__dirname, "../content/magazine");
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
        category: data.category || "Destination Guide",
        tagClass: TAG_CLASS[data.category] || "mag-tag-ma",
        excerpt: data.excerpt || "",
        author: data.author || "The Mimajo Team",
        read_time: data.read_time || 4,
        date: data.date || null,
        featured: !!data.featured,
        bodyHtml: md.render(content || ""),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};
