const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router
    .route("/")
    .post(userController.upsert);

// Matches with "/api/user/jobs"
router
    .route('/jobs')
    .post(userController.saveJob)
// saved jobs by google user id
router
    .route('/jobs/saved/:googleId')
    .get(userController.getJobs)
    .post(userController.updateJobs)
// job by id under user by google user id
router
    .route('/jobs/saved/:googleId/:jobId')
    .get(userController.getUserJob)
    .put(userController.updateUserJob)
    .delete(userController.deleteUserJob)

module.exports = router;