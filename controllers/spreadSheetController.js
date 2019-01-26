const db = require("../models");

// Defining methods for the jobsController
module.exports = {
  findAll: function(req, res) {
    db.SpreadSheet
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.SpreadSheet
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByTerm: function(req, res) {
    let term = req.query.term.replace(/\+/g, ' ')
    db.SpreadSheet
      .find({"keywords": {$regex : term, $options: 'i'} })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.SpreadSheet
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
	db.SpreadSheet
      .findOneAndUpdate({ _id: req.params.id }, req.body)
	  .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.SpreadSheet
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};