'use strict';

require('dotenv').config();
const fileType = require('file-type');
const AWS = require('aws-sdk');
const crypto = require('crypto');

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


// creating helper function in case file-type cant identify type of file-type
//helper will assugn default and must return object

const prepareFile = (data) => {
  return Object.assign({ // second arg overwrites first arg
    data,
    ext: 'bin',
    mime: 'application/octet-stream', //set defaults
  }, fileType(data)); //overwrites defaults
};

const randomHexString = (length) => {
  return new Promise((resolve, reject)=>{
    crypto.randomBytes(length, (error,buffer)=>{
      if(error){
        reject(error);
      }
      resolve(buffer.toString('hex'));
    });
  });
};

const awsUpload = (file) => {
  return randomHexString(16)
  .then((filename)=>{
    let dir = new Date().toISOString().split('T')[0];
    return {
      ACL: "public-read",
      Body: file.data,
      Bucket: 'shireen-wdi-bucket',
      ContentType: file.mime,
      Key: `${dir}/${filename}.${file.ext}`
    };
  })
  .then((options)=>{
    return new Promise((resolve, reject)=> {
      s3.upload(options, (error, data)=>{
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    });
  });
};

module.exports = {
  prepareFile,
  awsUpload,
}
