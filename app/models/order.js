'use strict';

const mongoose = new mongoose.Schema({
  items: {
    type: array,
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
  }
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
});

productSchema.virtual('calculated_total').get(function() {
  let front_total = this.total;
  if (!this.total) {
    return 'Error';
  }
  if (this.total > 0 ){
    return true;
  }
});

let Product = mongoose.model.('Product', productSchema);

module.exports = Product;
