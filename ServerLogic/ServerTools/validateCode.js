// This function will check if the attempted sign up code is available
const Code = require('../../models/codes')

module.exports = function (signupData) {
  return new Promise (function(resolve, reject) {

    Code.findOneAndUpdate({code: signupData.body.code}, {used: true})
    .then((codeDoc) => {
      if (!codeDoc) reject('Code does not exist')
      if (codeDoc.used) reject('Code already used')
      resolve(signupData)
    })
    .catch((error) => {
      reject('ERROR(validateCode.js): ' + error)
    })

  })
};
