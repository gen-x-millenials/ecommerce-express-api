'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  token: {
    type: String,
    require: true,
  },
  passwordDigest: String,
}, {
  timestamps: true,
});

adminSchema.plugin(uniqueValidator);

adminSchema.methods.comparePassword = function (password) {
  let _this = this;

  return new Promise((resolve, reject) =>
    bcrypt.compare(password, _this.passwordDigest, (err, data) =>
        err ? reject(err) : data ? resolve(data) : reject(new Error('Not Authorized')))
    ).then(() => _this);
};

adminSchema.virtual('password').set(function (password) {
  this._password = password;
});

adminSchema.pre('save', function (next) {
  let _this = this;

  if (!_this._password) {
    return next();
  }

  new Promise((resolve, reject) =>
    bcrypt.genSalt(null, (err, salt) =>
        err ? reject(err) : resolve(salt))
  ).then((salt) =>
    new Promise((resolve, reject) =>
      bcrypt.hash(_this._password, salt, (err, data) =>
        err ? reject(err) : resolve(data)))
  ).then((digest) => {
    _this.passwordDigest = digest;
    next();
  }).catch((error) => {
    next(error);
  });
});

adminSchema.methods.setPassword = function (password) {
  let _this = this;

  return new Promise((resolve, reject) =>
    bcrypt.genSalt(null, (err, salt) =>
        err ? reject(err) : resolve(salt))
  ).then((salt) =>
    new Promise((resolve, reject) =>
      bcrypt.hash(password, salt, (err, data) =>
        err ? reject(err) : resolve(data)))
  ).then((digest) => {
    _this.passwordDigest = digest;
    return _this.save();
  });
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
