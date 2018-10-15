const db = require("../models");

module.exports = {
  getCountries: function(req, res) {
    db.Countries
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getCities: function(req, res) {
    db.Cities
    .find({state_id: req.params.id})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  getStates: function(req, res) {
    db.States
    .find({country_id: req.params.id})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};