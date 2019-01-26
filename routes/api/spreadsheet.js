const router = require("express").Router();
const spreadSheetController = require("../../controllers/spreadSheetController");


// Matches with "/api/spreadSheet"
router
  .route("/")
  .get(spreadSheetController.findAll)
  .post(spreadSheetController.create);

// Search by keyword
router
  .route('/search')
  .get(spreadSheetController.findByTerm);

// Matches with "/api/spreadSheet/:id"
router
  .route("/:id")
  .get(spreadSheetController.findById)
  .put(spreadSheetController.update)
  .delete(spreadSheetController.remove);

module.exports = router;