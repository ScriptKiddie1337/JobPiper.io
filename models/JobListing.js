var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var JobSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  image: {
    type: String
  },

  date: Date,
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Job with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: 'UserNote'
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contacts'
  }
});

// This creates our model from the above schema, using mongoose's model method
var JobListing = mongoose.model('JobListing', JobSchema);

// Export the Job model
module.exports = JobListing;