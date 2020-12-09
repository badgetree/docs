#!/usr/bin/env node

// TODO: Accept variable file args and glob
const argv = require("minimist")(process.argv.slice(2));

const files = argv['_']
