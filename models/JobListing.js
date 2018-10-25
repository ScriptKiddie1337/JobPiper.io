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
  // Site name the job was pulled from
  site: {
    type: String,
    index: true,
    required: [true, 'Site is required for filtering purposes']
  },
  // `link` is required and of type String
  link: {
    type: String
  },
  // body will contain any announcement info we're able to scrape
  body: {
    type: String
  },
  search: [{
    type: String
  }],
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