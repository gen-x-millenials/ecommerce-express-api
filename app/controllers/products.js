'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Product = models.product;


const multer = require('app/middleware').multer;

const uploader = require('lib/aws-s3-upload');

const authenticate = require('./concerns/authenticate_admin');

const index = (req, res, next) => {
  Product.find()
    .then(products => res.json({ products }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product ? res.json({ product }) : next())
    .catch(err => next(err));
};

// const create = (req, res, next) => {
//   let product = Object.assign(req.body.product
//     // , {_owner: req.currentUser._id,}
//   );
//   Product.create(product)
//     .then(product => res.json({ product }))
//     .catch(err => next(err));
// };

const create = (req, res, next) => {
  // let upload = {
  //   comment: req.body.upload.comment,
  //   file: req.file,
  // };
  // res.json({upload})

  uploader.awsUpload(req.file.buffer) //multer is what creates .file key and provides buffer
  .then((response)=> {
    // return Object.assign({ // probably necessary for auth and attaching user id
      // return {
      //   comment: req.body.upload.comment,
      //   location: response.Location
      // };
      return {
        name: req.body.product.name,
        description: req.body.product.description,
        category: req.body.product.category,
        price: req.body.product.price,
        image: response.Location
      };
  })
  .then((product)=> {
    return Product.create(product)
  })
  .then(product => res.json({ product }))
  .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id
    // , _owner: req.currentUser._id
  };
  Product.findOne(search)
    .then(product => {
      if (!product) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return product.update(req.body.product)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id
    // , _owner: req.currentUser._id
  };
  Product.findOne(search)
    .then(product => {
      if (!product) {
        return next();
      }

      return product.remove()
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
}, { before: [
  { method: authenticate, except: ['index', 'show'] },
  {method: multer.single('product[image]'), only:['create']}
], });
