'use strict';

const mongoose = require('mongoose');

let uri;
if (process.env.NODE_ENV === 'production') {
  uri = process.env.MONGODB_URI;
} else {
  uri = 'mongodb://localhost/ecommerce-express-api';
}

mongoose.Promise = global.Promise;
mongoose.connect(uri);

module.exports = mongoose;
