const keys = require('./keys');

module.exports = (cloudinary) => {
  cloudinary.config({
    cloud_name: keys.CLOUD_NAME,
    api_key: keys.API_KEY,
    api_secret: keys.API_SECRET
  });
};