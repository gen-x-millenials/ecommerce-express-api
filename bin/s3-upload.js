'use strict';

const fs = require('fs');
const uploader = require('../lib/aws-s3-upload.js');

let filename = process.argv[2] || '';

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
