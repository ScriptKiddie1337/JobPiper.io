const mongoose = require('mongoose');
const locales = require('../utils/locales')
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;
const statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
// Using the Schema constructor, create a new AddressSchema object
// This is similar to a Sequelize model
const AddressSchema = new Schema({
    // object id
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: [true, 'id is required and should be auto-generating'],
      auto: true,
    },
    street: String,
    city: String,
    // Apartment or suite number
    suite: String,
    state: {
        type: String,
        uppercase: true,
        required: true,
        enum: statesArray
    },
    zip: {
      type: Number,
      validate: [zip => {
        return validator.isPostalCode(zip, 'any')
      }, 'address.zip.invalidPostalCode']
    },
    country: {
      type: String,
      required: true,
      enum: locales.name
    }
})

module.exports = mongoose.model('Address', AddressSchema);