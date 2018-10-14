const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;
// Using the Schema constructor, create a new CountriesSchema object
// This is similar to a Sequelize model
const CountriesSchema = new Schema({
    id: Number,
    sortname: String,
    name: String,
    phoneCode: Number
})

module.exports = mongoose.model('Countries', CountriesSchema);