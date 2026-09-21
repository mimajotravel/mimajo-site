const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({ html: true });

module.exports = () => {
  const file = path.join(__dirname, "../content/pages/privacy.md");
  if (!fs.existsSync(file)) {
    return { title: "Privacy Policy", tagline: "", bodyHtml: "" };
  }
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    title: data.title || "Privacy Policy",
    tagline: data.tagline || "",
    bodyHtml: md.render(content || ""),
  };
};
