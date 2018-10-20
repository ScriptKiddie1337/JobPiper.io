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
        db.Users
            .findOne({
                google_id: req.body.googleId,
                jobs: req.body.jobId
            })
            .count()
            .then(isDuplicate => {
                if (!isDuplicate) {
                    db.Users.update(
                        { google_id: req.body.googleId },
                        { $push: { jobs: req.body.jobId } }
                    )
                        .then(res.status(204))
                        .catch(err => res.status(422).json(err))
                } else {
                    res.status(204)
                }
            })
    },
    getJobs: function (req, res) {
        db.Users
            .findOne({
                google_id: req.params.googleId
            })
            .then(user => {
                user.jobs.forEach(job => axios.get(`api/jobs/${jobId}`))
                res.status(200)
            })
            .catch(err => res.status(422).json(err))
    }
};