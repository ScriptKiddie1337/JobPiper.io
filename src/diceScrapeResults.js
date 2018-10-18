const axios = require('axios');
const cheerio = require('cheerio');

// diceScrapeResults('https://www.dice.com/jobs/q-front_end-l-Jacksonville%2C_FL-radius-30-startPage-2-jobs')

async function diceScrapeResults(url) {
    console.log(`Scraping URL: ${url}`)
    let jobs = [];
    await axios.get(url)
        .then(function (response) {
            const $ = cheerio.load(response.data);
            $('.complete-serp-result-div').each((index, item) => {
                let $company = $(item).find('.compName').html()
                let $title = $(item).find('[itemprop="title"]').html()
                let $location = $(item).find('[itemprop="addressLocality"]').html()
                let $logo = $(item).find('img').attr('src')
                let $listing = $(item).find('a').attr('href')
                jobs.push(
                    {
                        site: 'Dice.com',
                        title: $company,
                        link: `https://dice.com${$listing}`,
                        image: ($logo ? `https:${$logo}` : '/images/dice_logo.svg'),
                        keywords: [$title.trim(), $location],
                    }
                )
            })
        }).catch(async error=> jobs = await diceErrorScrape(error))
        // console.log(jobs)
        return jobs;
        
}
function diceErrorScrape(error) {
    console.log(`Site returning data through error.response.data: Running error scraper.`)
    let jobs = [];
    const $ = cheerio.load(error.response.data);
    $('.complete-serp-result-div').each((index, item) => {
        let $company = $(item).find('.compName').html()
        let $title = $(item).find('[itemprop="title"]').html()
        let $location = $(item).find('[itemprop="addressLocality"]').html()
        let $logo = $(item).find('img').attr('src')
        let $listing = $(item).find('a').attr('href')
        jobs.push(
            {
                site: 'Dice.com',
                title: $company,
                link: `https://dice.com${$listing}`,
                image: ($logo ? `https:${$logo}` : '/images/dice_logo.svg'),
                keywords: [$title.trim(), $location],
            }
        )
    })
    // console.log(jobs, `************error jobs*************`)
    console.log(`Error data scrape complete.`)
    return jobs;
}

module.exports = diceScrapeResults;