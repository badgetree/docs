const md = require("markdown-it")({
  typographer: true,
})
  .use(require("markdown-it-anchor"), {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: "§",
  })
  .use(require("markdown-it-toc-done-right"));

module.exports = function render(file) {
  const result = md.render(file);
  console.log(result); // eslint-disable-line
};
