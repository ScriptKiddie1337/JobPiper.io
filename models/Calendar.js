var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

const CalendarSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: [true, 'id is required and should be auto-generating'],
        auto: true,
    },
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