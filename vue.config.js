const baseTemplate =
  process.env.NODE_ENV === "development"
    ? "public/browser-extension-debug.html"
    : "public/browser-extension.html";

module.exports = {
  pages: {
    override: {
      template: "public/browser-extension.html",
      entry: "./src/override/main.ts",
      title: "Bookmarks",
    },
    sidebar: {
      template: baseTemplate,
      entry: "./src/sidebar/main.ts",
      title: "Sidebar",
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {},
      manifestTransformer: (manifest) => {
        if (process.env.NODE_ENV === "development") {
          manifest.content_security_policy =
            "script-src 'self' 'unsafe-eval' http://localhost:8098; object-src 'self'";
        }
        return manifest;
      },
    },
  },
};
