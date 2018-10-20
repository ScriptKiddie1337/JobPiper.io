const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const diceScrapeResults = require('./diceScrapeResults.js')
const diceMakeSearchArray = require('./diceMakeSearchArray.js')

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

async function dice(term, city, state) {
    // make an array of all listing URLs to scrape
    await diceMakeSearchArray(term, city, state).then(async (searchArray) => {
        // console.log(searchArray);
        for (const page of searchArray) {
            // scrape individual job listings
            await diceScrapeResults(page)
                .then(async results => {
                        for (job of results) {
                            await jobDetails(job)
                        }
                }).catch(err => err);
            }
        })
        .catch(err => err);

    // close mongoose connection when done
    await console.log('Full results obtained: Scrape Complete')
}

async function createJob(result) {
    const query = {
        title: result.title,
        keywords: result.keywords,
    }
    const record = Object.assign({
        date: Date.now()
    },
        result)
    // instead of using create, I use findOneAndUpdate
    // but add the upsert option. If no record is found,
    // the query will create a new record with the passed
    // in parameters. This avoids duplicate data being scraped.
    await db.JobListing.findOneAndUpdate(query, record, { upsert: true })
        .then(function (dbJob) {
            // View the added result in the console
            // dbJob ? console.log(`Listing already in database: ${dbJob}`) : null;
            return dbJob;
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            console.log('fn.createJob error: ', err);
            throw new Error(err);
        })
};

async function jobDetails(job) {
    await axios.get(job.link)
        .then(function (response) {
            const $ = cheerio.load(response.data);
            let $keywords = $('.job-info').find('[itemprop="skills"]').html()
            let mergedKeywords = job.keywords.concat($keywords.replace(/\n/g, '').replace(/\t/g, '').split(','));
            let body = $('#jobdescSec').html().replace(/\n/g, '').replace(/\t/g, '');
            const fullJob = Object.assign({
                body: body,
                keywords: mergedKeywords,
                search: mergedKeywords.concat(body, job.title)
            }, job)
            createJob(fullJob)
        })
}



module.exports = dice;