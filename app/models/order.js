'use strict';

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: {
    type: Array,
    default : [],
    required: true,
  },
  total: {
    type: Number,
    required: true,
    // validate:
    //   (function(v) {
    //     let itemsArray = this.items;
    //     let sum = 0;
    //     for(let i=0; i<itemsArray.length; i++){
    //       sum += itemsArray[i].price * itemsArray[i].quantity;
    //     }
    //     return sum === v;
    //   },
    //   message: 'Improper total submitted');

    },
  notes: {
    type: String,
  },
  paid: {
    type: Boolean,
  },
  token: {
    type: String,
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// orderSchema.virtual('calculated_total').get(function() {
//   let front_total = this.total;
//   if (!this.total) {
//     return 'Error';
//   }
//   if (this.total > 0 ){
//     return this.items.length;
//   }
// });

orderSchema.virtual('total_validation').get(function() {
  let front_total = this.total;
  if (!this.total) {
    return 'Error';
  }
  let itemsArray = this.items;
  let sum = 0;
  for(let i=0; i<itemsArray.length; i++){
    sum += itemsArray[i].price * itemsArray[i].quantity;
  }
  if (front_total == sum ){
    return true;
  } else {
    return 'Error';
  }
});



let Order = mongoose.model('Order', orderSchema);

module.exports = Order;
