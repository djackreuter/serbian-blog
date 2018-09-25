const cloudinary = require('cloudinary');
require('../config/cloudinary')(cloudinary);

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, 
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
    });
  }); 
};

module.exports = { uploadImage };