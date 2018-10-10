const router = require("express").Router();
const jobsController = require("../../controllers/jobsController");

// Matches with "/api/jobs"
router
  .route("/")
  .get(jobsController.findAll)
  .post(jobsController.create);

// Search by keyword
router
  .route('/search')
  .get(jobsController.findByTerm);

// Matches with "/api/jobs/:id"
router
  .route("/:id")
  .get(jobsController.findById)
  .put(jobsController.update)
  .delete(jobsController.remove);

module.exports = router;
