const rp = require('request-promise');
const url = 'https://pokemondb.net/pokedex/national';
const fs = require('fs');
const puppeteer = require('puppeteer');

puppeteer
    .launch()
    .then(browser => {
        return browser.newPage();
    })
    .then(page => {
        return page.goto(url)
            .then(() => page.content());
    })
    .then(html => createPageHatml(html))
    .catch(err => console.log(err));

const createPageHatml = (html) => {
    fs.writeFile('index.html', html, (err) => {
        if(err) throw err;
        console.log('ook!')
    })
}
