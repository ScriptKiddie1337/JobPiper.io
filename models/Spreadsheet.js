const mongoose = require('mongoose');
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new AddressSchema object
// This is similar to a Sequelize model
const SheetSchema = new Schema({
  // `title` of job is required and of type String
  title: {
    type: String,
    index: true,
    required: [true, 'The title must be supplied']
  },
  // link for job description/application
  site_link: {
    type: String,
  },
  // `link` for HR email is required and of type String
  hr_link: {
    type: String
  },
  // body will contain any notes user leaves
  body: {
    type: String
  },
  // company name
  company: [{
    type: String
  }],
  // industry that job is in
  industry: [{
    type: String
  }],
  // size of company
  size: {
    type: Number
  },
  // method applied to job
  method: {
	  type: String
  },
  // Status 
  status: {
	  type: String
  },
  // Date applied for job
  date: {type: Date, default: Date.now}
});

// Export the Spreadsheet model
module.exports = mongoose.model('SpreadSheet', SheetSchema);