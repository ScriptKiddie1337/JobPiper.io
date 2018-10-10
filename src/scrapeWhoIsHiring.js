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


function scrapeWhoIsHiring(url, res) {
  console.log(url)
  axios.get(url)
    .then(function (response) {
      const $ = cheerio.load(response.data);
      $('span.commtext').each((index, ch) => {
        $ch = $(ch).html()
        $p = $(ch).children('p').html()
        if ($ch.includes('|') && $p) {
          createJob({
            title: keywords($ch)[0],
            keywords: keywords($ch),
            body: $p,
            site: 'yCombinator'
          });
        }
      })
      // res.send('Scrape Complete');

      function keywords(el) {
        return ((el) ?
          el.substring(0, el.indexOf('<p>'))
          .trim()
          .replace(/ *\([^)]*\) */g, "")
          .replace(/ *\<[^)]*\> */g, "")
          .replace(/\-/g, ' ') :
          null).split('|').map(word => word.trim());
      }
      function createJob(result) {
        const query = {
          title: result.title,
          keywords: result.keywords,
          body: result.body,
          site: result.site
        }
        const record = Object.assign({date:Date.now()}, query)
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
    .catch(err => console.log(`yCombinator GET ${url} error: `, err));
}

module.exports = scrapeWhoIsHiring;