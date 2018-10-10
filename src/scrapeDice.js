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

scrapeDice('https://www.dice.com/jobs/q-front_end-startPage-1-jobs')

function scrapeDice(url, res) {
  console.log(url)
  axios.get(url)
    .then(function (response) {
      const $ = cheerio.load(response.data);
      $('.complete-serp-result-div').each((index, item) => {
        let $company = $(item).find('.compName').html()
        let $title = $(item).find('[itemprop="title"]').html()
        let $body = $(item).find('[itemprop="description"]').html()
        let $locaiton = $(item).find('[itemprop="addressLocality"]').html()
        let $logo = $(item).find('img').attr('src')
        let $listing = $(item).find('a').attr('href')

        console.log(index, $item)

      })
      })
      .catch(err => console.log(`dice.comGET ${url} error: `, err));

}

module.exports = scrapeDice;