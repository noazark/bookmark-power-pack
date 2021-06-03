module.exports = {
  pages: {
    override: {
      template: "public/browser-extension.html",
      entry: "./src/override/main.ts",
      title: "Bookmarks",
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {},
    },
  },
};
