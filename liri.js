//dont forget to require spotify and omdb!!!


var keysExport = require("./keys.js");

var keysData = keysExport.twitterKeys;

var twitter = require("twitter");

var commandArgs = process.argv[2];

console.log(keysData);

