#!/usr/bin/env node

const fs = require("fs");
const toVfile = require("to-vfile");
const argv = require("minimist")(process.argv.slice(2));
const render = require("./render");

const files = argv["_"];

files.forEach(async (file) => {
  const vfile = await toVfile.read(file);
  render(vfile);
});
