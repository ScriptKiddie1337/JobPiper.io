const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;
// Using the Schema constructor, create a new CountriesSchema object
// This is similar to a Sequelize model
const CountrySchema = new Schema({
    id: String,
    sortname: String,
    name: String,
    phoneCode: String
})

module.exports = mongoose.model('Countries', CountrySchema);