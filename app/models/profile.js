'use strict';

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    given: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    }
    },
    addresses: {
      type: Array,
    },
    credit_cards: {
      type: Array,
    },
    _owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
