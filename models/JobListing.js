var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var JobSchema = new Schema({
  // object id
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: [true, 'id is required and should be auto-generating'],
    auto: true,
  },
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
  image: {
    type: String
  },
});

// Export the JobListing model
module.exports = mongoose.model('JobListing', JobSchema);