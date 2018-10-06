'use strict'

const rp = require('request-promise');
const $ = require('cheerio');
let president = {};
const popuParse = async url => {
	try {
		const html = await rp(url)
		return president = {
			name: $('.firstHeading', html).text(),
			birthday: $('.bday', html).text()
		} 
	} catch (err) {
		console.log('err')
	}
};

module.exports = popuParse;
