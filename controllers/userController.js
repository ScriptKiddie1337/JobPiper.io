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
                async function getJobsById(jobs, res) {
                    let result = []
                    const promises = jobs.map(jobId =>
                        db.JobListing.findById(jobId, (err, res) => {
                            // Add job if don't get error from db
                            if (!err) {
                                result.push(res)
                            }
                        })
                    )
                    await Promise.all(promises)
                    res.json(result)
                }

                getJobsById(user.jobs, res)
            }
            )
            .catch(err => res.status(422).json(err))
    }
};