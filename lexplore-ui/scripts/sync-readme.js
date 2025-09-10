const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "../../README.md");
const DEST = path.resolve(__dirname, "../public/README.md");

fs.copyFileSync(SRC, DEST);
console.log("README.md synced to public/");
