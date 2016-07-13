'use strict';

const multer = require('multer');
const storage = multer.memoryStorage(); //dont do this in production

module.exports = multer({ storage });
