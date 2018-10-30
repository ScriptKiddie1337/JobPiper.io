const db = require("../models");

// .get(eventController.getEvents)
// .put(eventController.updateEvent)
// .post(eventController.createEvent)
// .delete(eventController.deleteEvent)

module.exports = {

    getEvents: function (req, res) {
        db.Users.find({
            google_id: req.body.google_id
        })
            .then(user => res.json(user.events))
            .catch(err => res.status(404).json(err))
    },
    createEvent: function (req, res) {
        const googleId = req.body.googleId;
        const newEvent = req.body.newEvent;
        console.log({ google_id: googleId },
            { $push: { events: newEvent } })
        db.Users.update(
            { google_id: googleId },
            { $push: { events: newEvent } }
        )
            .then(res.sendStatus(201))
            .catch(err => res.status(422).json(err))
    }

}