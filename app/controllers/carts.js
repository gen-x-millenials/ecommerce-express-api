'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Cart = models.cart;

// const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Cart.find()
    .then(carts => res.json({ carts }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Cart.findById(req.params.id)
    .then(cart => cart ? res.json({ cart }) : next())
    .catch(err => next(err));
};

const showUserCarts = (req, res, next) => {
 Cart.find({
   _owner: req.params.owner,
 })
   .then(carts => res.json({ carts }))
   .catch(err => next(err));
};

const create = (req, res, next) => {
  let cart = Object.assign(req.body.cart
    // , { _owner: req.currentUser._id,}
  );
  Cart.create(cart)
    // .then(function(cart){
    //   if (cart.total_validation !== true ){
    //     throw Error('Invalid Total');
    //   }
    //   return cart;
    // })
    .then(cart => res.json({ cart }))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Cart.findOne(search)
    .then(cart => {
      if (!cart) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return cart.update(req.body.cart)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id
    // , _owner: req.currentUser._id
  };
  Cart.findOne(search)
    .then(cart => {
      if (!cart) {
        return next();
      }

      return cart.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  showUserCarts,
}, { before: [
  // { method: authenticate, except: ['index', 'show'] },
], });
