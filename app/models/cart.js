'use strict';

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: {
    type: Array,
    default : [],
    required: true,
  },
  total: {
    type: Number,
    required: true,
    },
  paid: {
    type: Boolean,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
},
  {
    timestamps: true,
  }
);


let Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
