#!/usr/bin/env node
const getVkPics = require('.');

// Specific to my own environment
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// USAGE
const urls = process.argv.slice(2);
(async () => {
	const output = await Promise.all(urls.map(getVkPics));
	console.log(output);
})();

