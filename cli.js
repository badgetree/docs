#!/usr/bin/env node

const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));
const render = require("./render");

const files = argv["_"];

files.forEach(async (file) => {
  fs.readFile(file, "utf-8", async function (err, data) {
    if (err) throw err;
    await render(data);
  });
});
