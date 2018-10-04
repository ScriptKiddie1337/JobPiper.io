const mongoose = require('mongoose');
const validator = require('validator');
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
    // pull time from date
    date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
        default: Date.now
    },
    all_day: {
        type: Boolean,
        required: true,
        validate: [day => {
            return validator.isBoolean(day)
        }, 'calendar.all_day.invalidBooleanValue']
    },
    saved_job_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    contact_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    address_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    repeat: {
        type: Boolean,
        required: true,
        validate: [repeat => {
            return validator.isBoolean(repeat)
        }, 'calendar.repeat.invalidBooleanValue']
    },
    // iterator for repeating events
    nth: {
        type: String,
        validate: [n => {
            return validator.isInt(n)
        }, 'calendar.nth.invalidInteger']
    },
    repeat_end: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Calendar', CalendarSchema);