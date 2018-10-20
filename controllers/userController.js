const db = require("../models");

// Defining methods for the jobsController
module.exports = {
    upsert: function (req, res) {
        db.Users
            .findOneAndUpdate(req.body.google_id, req.body, { upsert: true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    saveJob: function (req, res) {
        const job = req.body.jobData
        const googleId = req.body.googleId
        db.Users
            .findOne({
                google_id: googleId,
                jobs: job
            })
            .count()
            .then(isDuplicate => {
                if (!isDuplicate) {
                    db.Users.update(
                        { google_id: googleId },
                        { $push: { jobs: job } }
                    )
                        .then(res.sendStatus(201))
                        .catch(err => res.status(422).json(err))
                } else {
                    res.sendStatus(204)
                }
            })
    },
    getJobs: (req, res) => {
        db.Users
            .findOne({
                google_id: req.params.googleId
            })
            .then(user => {
                res.json(user.jobs)
            })
            .catch(err => res.status(404).json(err))
    }
};