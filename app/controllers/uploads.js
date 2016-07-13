'use strict';

const controller = require('lib/wiring/controller');
// const middlewate = require('app/middleware');
// const multer = middleware.multer;
const multer = require('app/middleware').multer;

const models = require('../models');
const Upload = models.upload;

const uploader = require('lib/aws-s3-upload');

// const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  Upload.find()
    .then(uploads => res.json({ uploads }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  Upload.findById(req.params.id)
    .then(upload => upload ? res.json({ upload }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {

  console.log('create function reached');
  uploader.awsUpload(req.file.buffer) //multer is what creates .file key and provides buffer
  .then((response)=> {
    console.log('the response is '+response)
    console.log(data);
      return {
        comment: req.body.upload.comment,
        location: res.Location
      };
  })
  .then((upload)=> {
    return Upload.create(upload);
  })
  .then(upload => res.json({ upload }))
  .catch(err => next(err));
};

// const update = (req, res, next) => {
//   let search = { _id: req.params.id, _owner: req.currentUser._id };
//   upload.findOne(search)
//     .then(upload => {
//       if (!upload) {
//         return next();
//       }
//
//       delete req.body._owner;  // disallow owner reassignment.
//       return upload.update(req.body.upload)
//         .then(() => res.sendStatus(200));
//     })
//     .catch(err => next(err));
// };
//
// const destroy = (req, res, next) => {
//   let search = { _id: req.params.id, _owner: req.currentUser._id };
//   upload.findOne(search)
//     .then(upload => {
//       if (!upload) {
//         return next();
//       }
//
//       return upload.remove()
//         .then(() => res.sendStatus(200));
//     })
//     .catch(err => next(err));
// };

module.exports = controller({
  index,
  show,
  create,
  // update,
  // destroy,
}, { before: [
  // { method: authenticate, except: ['index', 'show'] },
  { method: multer.single('upload[file]'), only:['create'] }
], });
