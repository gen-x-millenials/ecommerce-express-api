'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Order = models.order;

const authenticate = require('./concerns/authenticate');
const stripe = require("stripe")("sk_test_PDmUqKt58rH9534YMuzGtQFf");

const index = (req, res, next) => {
  Order.find()
    .then(orders => res.json({ orders }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order ? res.json({ order }) : next())
    .catch(err => next(err));
};

const showUserOrders = (req, res, next) => {
 Order.find({
   _owner: req.params.owner,
 })
   .then(orders => res.json({ orders }))
   .catch(err => next(err));
};

const create = (req, res, next) => {
  let order = Object.assign(req.body.order
    , { _owner: req.currentUser._id,}
  );
  Order.create(order)
    .then(function(order){
      if (order.total_validation !== true ){
        throw Error('Invalid Total');
      }
      return order;
    })
    .then(order => res.json({ order }))
    .catch(err => next(err));
};

// const createCharge = (req, res, next) => {
//   Order.find()
//     .then(() => res.sendStatus(200))
//     .catch(err => next(err));
// };

// function to create stripe charge
const createCharge = (req, res, next) => {
 stripe.charges.create({
   amount: req.body.amount,
   currency: "usd",
   source: req.body.stripeToken,
 }).then(charge => res.json({ charge }))
 .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Order.findOne(search)
    .then(order => {
      if (!order) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return order.update(req.body.order)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id
    // , _owner: req.currentUser._id
  };
  Order.findOne(search)
    .then(order => {
      if (!order) {
        return next();
      }

      return order.remove()
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
  showUserOrders,
  createCharge,
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
], });
