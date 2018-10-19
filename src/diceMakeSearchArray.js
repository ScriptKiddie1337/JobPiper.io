const axios = require('axios');
const cheerio = require('cheerio');

async function makeSearchArray(term, city, state) {
    let url = `https://www.dice.com/jobs?q=${term.replace(' ', '+')}&l=${city.replace(' ', '+')}%2C+${state}`
    let sArray = [];
    await axios.get(url)
        .then(function (response) {
            const $ = cheerio.load(response.data);
            let count = Math.ceil($('span[id="posiCountId"]').text()/30)
            for (i = 1; i <= count; i++) {
                (i === 1 ? sArray.push(`${url}`) : sArray.push(`https://www.dice.com/jobs/q-${term.replace(' ', '_')}-l-${city.replace(' ', '_')}%2C_${state}-radius-30-startPage-${i}-jobs`))
            }
        });
        // await console.log(sArray);
        return sArray;
    }

    module.exports = makeSearchArray;