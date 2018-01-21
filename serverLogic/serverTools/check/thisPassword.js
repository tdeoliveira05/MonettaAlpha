// This function will check an attempted password against the real password of a user
const Meeting = require('../../../models/meetingModel')
const bcrypt = require('bcrypt')

module.exports = function (userDoc, possiblePassword) {
  return new Promise (function(resolve, reject) {
    bcrypt.compare(possiblePassword, userDoc.password, function(err, res) {
      res ? resolve(userDoc) : reject('check.thisPassword')
    })
  })
};
