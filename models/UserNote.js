var mongoose = require("mongoose");
//! do we need this model?
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var NoteSchema = new Schema({
  userID: String,
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String,
  // date created
  date: Date
});

// This creates our model from the above schema, using mongoose's model method
var UserNote = mongoose.model("UserNote", NoteSchema);

// Export the Note model
module.exports = UserNote;
