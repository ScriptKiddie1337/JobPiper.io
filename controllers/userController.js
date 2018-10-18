const db = require("../models");

// Defining methods for the jobsController
module.exports = {
    upsert: function (req, res) {
        db.Users
            .findOneAndUpdate(req.body.google_id, req.body, { upsert: true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};