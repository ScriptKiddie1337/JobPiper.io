const router = require("express").Router();
const locationController = require("../../controllers/locationController");

// Matches with "/api/loc"
router
  .route("/country")
  .get(locationController.getCountries);
  router
  .route("/city/:id")
  .get(locationController.getCities);
  router
  .route("/state/:id")
  .get(locationController.getStates);

module.exports = router;
