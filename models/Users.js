var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var Users = new Schema({
  userID: String,
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String,
  // date created
  date: Date
});

// This creates our model from the above schema, using mongoose's model method
var Users = mongoose.model("Users", UsersSchema);

// Export the Users model
module.exports = Users;
