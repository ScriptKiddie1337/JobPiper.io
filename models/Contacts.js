const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    Name: { // european standard is to do full name as one. Last name field is an american standard only
        type: String,
        required: [true, 'Name can be used for first or full name but must be included.']
    },
    last_name: String,
    phone: {
        type: String,
        validate: [phone => {
            return validator.isMobilePhone(phone)
        }, 'contact.invalidPhone']
    },
    email: {
        type: String,
        index: {
            unique: true
        },
        required: true,
        validate: [email => {
            return validator.isEmail(email)
        }, 'contact.invalidEmail']
    },
    // * should pull email if no username is given
    job_title: {
        type: String,
        index: {
            unique: true
        },
        required: true
    },
    facebook_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    twitter_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    google_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    github_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    linkedin_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    instagram_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    notes: [{
        date: {type: Date, default: Date.now},
        body: String
    }]
});

// run schema through validator
ContactSchema.plugin(uniqueValidator, {
    message: 'mongoose.unique-error'
});

// Export the Contacts model
module.exports = mongoose.model("Contacts", ContactSchema);