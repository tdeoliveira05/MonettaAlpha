// This function will check an attempted password against the real password of a user
const Meeting = require('../../../models/meetingModel')
const bcrypt = require('bcrypt')

module.exports = function (userDoc, possiblePassword) {
  return new Promise (function(resolve, reject) {

    bcrypt.compare(possiblePassword, userDoc.password)
    .then(() => {
      resolve(userDoc)
      console.log('Sucessful password match')
    })
    .catch(() => {
      reject("ERROR(checkThisPassword.js): Password does not match")
    })
  })
};
