const router = require("express").Router();
const jobsController = require("../../controllers/jobsController");
const diceAsync = require('../../src/diceAsync.js');
const scrapeWhoIsHiring = require('../../src/scrapeWhoIsHiring.js');

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

  // Matches with "/api/jobs/scrape
  router
    .get('/scrape/:term/:city/:region', function(req, res) {
      let search = req.params;
      scrapeWhoIsHiring();
      console.log(`running scrape by location: ${search.term}, ${search.city}, ${search.region}`)
      diceAsync(search.term, search.city, search.region);
    })

module.exports = router;
