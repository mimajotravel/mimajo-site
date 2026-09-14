const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

module.exports = () => {
  const file = path.join(__dirname, "../content/pages/membership.md");
  if (!fs.existsSync(file)) {
    return { heading: "", intro: "" };
  }
  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);
  return {
    heading: data.heading || "",
    intro: data.intro || "",
  };
};
