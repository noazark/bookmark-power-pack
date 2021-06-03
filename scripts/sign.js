#! /usr/bin/env node

const SA = require("sign-addon");
const dotenv = require("dotenv");
const package = require("../package.json");

const { signAddon } = SA;
dotenv.config();

signAddon({
  xpiPath: `./artifacts/bookmark-power-pack-v${package.version}-production.zip`,
  version: package.version,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  downloadDir: "./artifacts",
})
  .then(function (result) {
    if (result.success) {
      console.log("The following signed files were downloaded:");
      console.log(result.downloadedFiles);
      console.log("Your extension ID is:");
      console.log(result.id);
    } else {
      console.error("Your add-on could not be signed!");
      console.error("Error code: " + result.errorCode);
      console.error("Details: " + result.errorDetails);
    }
    console.log(result.success ? "SUCCESS" : "FAIL");
  })
  .catch(function (error) {
    console.error("Signing error:", error);
  });
