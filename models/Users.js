const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  Name: { // european standard is to do full name as one. Last name field is an american standard only
    type: String,
    // required: [false, 'Name can be used for first or full name but must be included.']
  },
  last_name: String,
  email: {
    type: String,
    index: {
      unique: true
    },
    required: true,
    validate: [email => {
      return validator.isEmail(email)
    }, 'user.invalidemail']
  },
  // * should pull email if no username is given
  user_name: {
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
    },
    required: true
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

  // job title interests
  job_interests: [{
    title: String,
    desc: String
  }],
  // dated planner for upcoming events "reminders"
  events: [{
    date: Date,
    event: String
  }],
  // job interests
  jobs: [{
    type: String
  }]
});

// run schema through validator
UserSchema.plugin(uniqueValidator, {
  message: 'mongoose.unique-error'
});

// Export the Users model
module.exports = mongoose.model("Users", UserSchema);
