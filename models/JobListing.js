const mongoose = require('mongoose');
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new AddressSchema object
// This is similar to a Sequelize model
const JobSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    index: true,
    required: [true, 'The title must be supplied']
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: [true, 'A URL must be supplied and should link directly to the job announcement']
  },
  // body will contain any announcement info we're able to scrape
  body: {
    type: String
  },
  keywords: [{
    type: String
  }],
  image: {
    type: String
  },
  date: {type: Date, default: Date.now}
});

// Export the JobListing model
module.exports = mongoose.model('JobListing', JobSchema);