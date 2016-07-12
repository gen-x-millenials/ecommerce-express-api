'use strict';

const mongoose = require('mongoose');

// items: [{
//   _id: String,
//   price: Number,
//   quantity: Number,
// }],

const orderSchema = new mongoose.Schema({
  items: {
    type: Array,
    default : [],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: Boolean
  },
  token: {
    type: String,
  },
  // _owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

orderSchema.virtual('calculated_total').get(function() {
  let front_total = this.total;
  if (!this.total) {
    return 'Error';
  }
  if (this.total > 0 ){
    return true;
  }
});

let Order = mongoose.model('Order', orderSchema);

module.exports = Order;
