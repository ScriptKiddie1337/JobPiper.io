const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const scrapeWhoIsHiring = require('./src/scrapeWhoIsHiring')

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/joblisting_db";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const rootLoad = async (req, res) => {
	// scrape updated listings
	await scrapeWhoIsHiring();

	// GET route for root will scrape the most recent listings and then send the html
	await app.get('/', function (req, res) {
		res.sendFile('index.html')
	})

}
// ! This is temporary and should be automated elsewhere
// scrape ycombinator and then send index.html
rootLoad();

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
