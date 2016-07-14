'use strict';

const mongoose = require('../app/middleware/mongoose');
const Upload = require('../app/models/upload');

const fs = require('fs');
const uploader = require('../lib/aws-s3-upload.js');

let filename = process.argv[2] || '';
let comment = process.argv[3] || 'No comment';

const readFile = (filename) => {
  return new Promise ((resolve, reject)=>{

    fs.readFile(filename, (error, data)=>{
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });

};




readFile(filename)
// .then(uploader.prepareFile)
.then(uploader.awsUpload)
.then((response)=>{
  let upload = {
    location: response.Location,
    comment: comment, // not defined yet
  };

  return Upload.create(upload);

})
.then(console.log)
.catch(console.error)
.then(() => mongoose.conection.close());



//
// readFile(filename)
// .then((data)=> {
//   let file = mimeType(data);
//   file.data = data;
//   return file;
// }).then(awsUpload)
// .then(console.log)
// .catch(console.error);
