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

router
    .route('/jobs/saved/:googleId')
    .get(userController.getJobs)

module.exports = router;