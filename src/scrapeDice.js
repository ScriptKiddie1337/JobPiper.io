const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

// Require all models
const db = require('../models');

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger('dev'));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: true
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// Connect to the Mongo DB
MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/joblisting_db";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


function scrapeDice(url, res) {
  console.log(url)
  axios.get(url)
    .then(function (response) {
      const $ = cheerio.load(response.data);
      $('.complete-serp-result-div').each((index, item) => {
        let $company = $(item).find('.compName').html()
        let $title = $(item).find('[itemprop="title"]').html()
        // ! let $body = $(item).find('[itemprop="description"]').html() replace with main job listing
        let $location = $(item).find('[itemprop="addressLocality"]').html()
        let $logo = $(item).find('img').attr('src')
        let $listing = $(item).find('a').attr('href')
        let job = {
          site: 'Dice.com',
          title: $company,
          link: `https://dice.com${$listing}`,
          image: $logo,
          keywords: [$title.trim(), $location]
        };

        // console.log(job.keywords)
        jobDetails(job)

        // console.log(index, $item)

      })

      function jobDetails(job) {
        axios.get(job.link)
        .then(function (response) {
          const $ = cheerio.load(response.data);
          let $keywords = $('.job-info').find('[itemprop="skills"]').html()
          let mergedKeywords = job.keywords.concat($keywords.replace(/\n/g,'').replace(/\t/g,'').split(','))
          let $jobInfo = $('.job-info').find('.iconsiblings').html()
          let body = $('#jobdescSec')
            // .find('p')
            .html()
            // .replace(/\n/g,'')
            // .replace(/\t/g,'')
            // console.log("************************************",body)
          const fullJob = Object.assign({
            body: body,
            keywords: mergedKeywords
          }, job)
          createJob(fullJob)

          
        })
        .catch(err => console.log(`dice.com/jobs/detail GET ${url} error: `, err));
      }
      function createJob(result) {
        const query = {
          title: result.title,
          keywords: result.keywords,
          body: result.body,
          site: result.site
        }
        const record = Object.assign({date:Date.now()}, result)
        // instead of using create, I use findOneAndUpdate
        // but add the upsert option. If no record is found,
        // the query will create a new record with the passed
        // in parameters. This avoids duplicate data being scraped.
        db.JobListing.findOneAndUpdate(query, record, {upsert:true})
          .then(function (dbJob) {
            // View the added result in the console
            dbJob ? console.log(`Listing already in database: ${dbJob}`) : null;
            return dbJob;
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            console.log('fn.createJob error: ', err);
            throw new Error(err);
          })
      };
      })
      .catch(err => console.log(`dice.com/jobs GET ${url} error: `, err));

}

module.exports = scrapeDice;