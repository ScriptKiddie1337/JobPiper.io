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
// update jobs by google user id
router
    .route('/jobs/saved/')    
    .put(userController.updateUserJobs);
// saved jobs by google user id
router
    .route('/jobs/saved/:googleId')
    .get(userController.getJobs)
// job by id under user by google user id
router
    .route('/jobs/saved/:googleId/:jobId')
    .get(userController.getUserJob)
    .delete(userController.deleteJob)

module.exports = router;