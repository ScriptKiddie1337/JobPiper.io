const router = require("express").Router();
const eventController = require("../../controllers/eventController");

// event event routes /api/event/
router
    .route('/')
    .get(eventController.getEvents)
    // .put(eventController.updateEvent)
    .post(eventController.createEvent)
    // .delete(eventController.deleteEvent)

    module.exports = router;