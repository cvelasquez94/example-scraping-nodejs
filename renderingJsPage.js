const rp = require('request-promise');
const url = 'https://www.buenosaires.gob.ar/subte';
const fs = require('fs');
const puppeteer = require('puppeteer');
const $ = require('cheerio');

puppeteer
    .launch()
    .then(browser => {
        return browser.newPage();
    })
    .then(page => {
        return page.goto(url)
            .then(() => page.content());
    })
    .then(html => {
        //createPageHatml(html)
        getStatusSubte(html).then((data) => console.log(data))
    })
    .catch(err => console.log(err));

const createPageHatml = (html) => {
    fs.writeFile('index.html', html, (err) => {
        if(err) throw err;
        console.log('ook!')
    })
}


const getStatusSubte = html => {
    return new Promise((resolve, reject) => {
        const subtes = Array('A', 'B', 'C', 'D', 'E', 'H')
        const data = subtes.map(linea => {
            const content = $(`#linea${linea}`, html)
            let data = content['0'].children[1].children[3].children[1].children[0].data        
            return ({
                linea: linea,
                status: data || 'Servicio con demora'
            })
        })
        resolve(data)
    })
}
