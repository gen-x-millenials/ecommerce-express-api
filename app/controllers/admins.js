'use strict';

const debug = require('debug')('ecommerce-express-api:admins');

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Admin = models.admin;

const crypto = require('crypto');

const authenticate = require('./concerns/authenticate_admin');

const HttpError = require('lib/wiring/http-error');

const MessageVerifier = require('lib/wiring/message-verifier');

const encodeToken = (token) => {
  const mv = new MessageVerifier('secure-token', process.env.SECRET_KEY);
  return mv.generate(token);
};

const getToken = () =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(16, (err, data) =>
      err ? reject(err) : resolve(data.toString('base64'))
    )
  );

const adminFilter = { passwordDigest: 0, token: 0 };

const index = (req, res, next) => {
  Admin.find({}, adminFilter)
    .then(admins => res.json({ admins }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Admin.findById(req.params.id, adminFilter)
    .then(admin => admin ? res.json({ admin }) : next())
    .catch(err => next(err));
};



const makeErrorHandler = (res, next) =>
  error =>
    error && error.name && error.name === 'ValidationError' ?
      res.status(400).json({ error }) :
    next(error);

const signup = (req, res, next) => {
  let credentials = req.body.credentials;
  let admin = { email: credentials.email, password: credentials.password };
  getToken().then(token =>
    admin.token = token
  ).then(() =>
    new Admin(admin).save()
  ).then(newAdmin => {
    let admin = newAdmin.toObject();
    delete admin.token;
    delete admin.passwordDigest;
    res.json({ admin });
  }).catch(makeErrorHandler(res, next));

};

const signin = (req, res, next) => {
  let credentials = req.body.credentials;
  let search = { email: credentials.email };
  Admin.findOne(search
  ).then(admin =>
    admin ? admin.comparePassword(credentials.password) :
          Promise.reject(new HttpError(404))
  ).then(admin =>
    getToken().then(token => {
      admin.token = token;
      return admin.save();
    })
  ).then(admin => {
    admin = admin.toObject();
    delete admin.passwordDigest;
    admin.token = encodeToken(admin.token);
    res.json({ admin });
  }).catch(makeErrorHandler(res, next));
};

const signout = (req, res, next) => {
  getToken().then(token =>
    Admin.findOneAndUpdate({
      _id: req.params.id,
      token: req.currentAdmin.token,
    }, {
      token,
    })
  ).then((admin) =>
    admin ? res.sendStatus(200) : next()
  ).catch(next);
};

const changepw = (req, res, next) => {
  debug('Changing password');
  Admin.findOne({
    _id: req.params.id,
    token: req.currentAdmin.token,
  }).then(admin =>
    admin ? admin.comparePassword(req.body.passwords.old) :
      Promise.reject(new HttpError(404))
  ).then(admin => {
    admin.password = req.body.passwords.new;
    return admin.save();
  }).then((/* admin */) =>
    res.sendStatus(200)
  ).catch(makeErrorHandler(res, next));
};

module.exports = controller({
  index,
  show,
  signup,
  signin,
  signout,
}, { before: [
  { method: authenticate, except: ['signup', 'signin'] },
], });
