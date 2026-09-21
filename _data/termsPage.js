const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({ html: true });

module.exports = () => {
  const file = path.join(__dirname, "../content/pages/terms.md");
  if (!fs.existsSync(file)) {
    return { title: "Terms of Use", tagline: "", bodyHtml: "" };
  }
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    title: data.title || "Terms of Use",
    tagline: data.tagline || "",
    bodyHtml: md.render(content || ""),
  };
};
