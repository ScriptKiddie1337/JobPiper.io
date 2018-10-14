const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;
// Using the Schema constructor, create a new StateSchema object
// This is similar to a Sequelize model
const StateSchema = new Schema({
    id: Number,
    name: String,
    country_id: Number
})

module.exports = mongoose.model('State', StateSchema);