'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/ecommerce-api';
mongoose.Promise = global.Promise;
mongoose.connect(uri);

module.exports = mongoose;
