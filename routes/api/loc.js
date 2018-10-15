const router = require("express").Router();
const locationController = require("../../controllers/locationController");

// Matches with "/api/loc"
router
  .route("/country")
  .get(locationController.getCountries);
  router
  .route("/city")
  .get(locationController.getCities);
  router
  .route("/state")
  .get(locationController.getStates);

module.exports = router;
