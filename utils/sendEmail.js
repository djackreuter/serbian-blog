const mailgun = require('mailgun-js');
const keys = require('../config/keys');
const domain = keys.DOMAIN;
const apiKey = keys.MAILGUN_API_KEY;
const mg = mailgun({apiKey, domain });
module.exports = sendEmail = (postTitle) => {
  return new Promise((resolve, reject) => {
    const data = {
      from: 'Admin <djreuter45@gmail.com>',
      to: 'darkserb@gmail.com',
      subject: 'Your post has a new comment!',
      text: `Your post "${postTitle}" has a new comment!`
    };
    
    mg.messages().send(data, (error, body) => {
      if (error) {
        reject(console.log(error));
      }
      resolve(console.log(body));
    });
  });
}