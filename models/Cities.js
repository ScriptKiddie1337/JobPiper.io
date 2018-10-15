const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;
// Using the Schema constructor, create a new CitiesSchema object
// This is similar to a Sequelize model
const CitiesSchema = new Schema({
    id: Number,
    name: String,
    state_id: Number
})

module.exports = mongoose.model('Cities', CitiesSchema);