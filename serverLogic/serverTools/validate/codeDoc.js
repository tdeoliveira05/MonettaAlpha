// This function will check if the attempted sign up code is available
const Code = require('../../../models/codeModel')

module.exports = function (newUserDoc) {
  return new Promise (function(resolve, reject) {

    Code.findOneAndUpdate({code: newUserDoc.codeUsed}, {used: true})
    .then(() => {
      resolve(newUserDoc)
    })
    .catch((error) => {
      reject('ERROR(validate.codeDoc.js): ' + error)
    })

  })
};
