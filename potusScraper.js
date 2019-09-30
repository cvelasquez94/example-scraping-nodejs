'use strict'

const rp = require('request-promise');
const $ = require('cheerio');
const potusParse = require('./potusParse');
const url = 'https://www.buenosaires.gob.ar/subte';

rp(url)
  .then((html) => {
    //success!
    const wikiUrls = [];
    // for (let i = 0; i < 45; i++) {
    //   wikiUrls.push([i].attribs.href);
    // }
    
    const content = $('div.pane-content', html)    // console.log(JSON.stringify(content.prevObject['0']), 'zzz')
    console.log(content['1'].next.parent.children, 'zzz')
    return content
    //return Promise.all(
    //  wikiUrls.map((url) => {
    //    return potusParse(`https://en.wikipedia.org${url}`);
    //  })
    //);
  })
  .catch((err) => {
    //handle error
    console.log(err);
  });



  //Use JSON.stringify with a custom replacer. For example:

// Demo: Circular reference


// Note: cache should not be re-used by repeated calls to JSON.stringify.
function a (o) {
  var cache = [];
  JSON.stringify(o, function(key, value) {
      if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
              // Duplicate reference found
              try {
                  // If this value does not reference a parent it can be deduped
                  return JSON.parse(JSON.stringify(value));
              } catch (error) {
                  // discard key if value cannot be deduped
                  return;
              }
          }
          // Store value in our collection
          cache.push(value);
      }
      return value;
  });
  cache = null
}