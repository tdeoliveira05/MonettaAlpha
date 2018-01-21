// This function will check if the attempted sign up code is available
const Code = require('../../../models/codeModel')

module.exports = function (dataParam) {
  return new Promise (function(resolve, reject) {

    Code.findOne({code: dataParam.body.codeUsed})
    .then((codeDoc) => {
      if (!codeDoc) reject('check.codeDoc[noExist]')
      if (codeDoc.used) reject('check.codeDoc[alreadyUsed]')
      return codeDoc
    })
    .then((codeDoc) => {
      resolve(codeDoc)
    })
    .catch((error) => {
      reject('ERROR(check.codeDoc.js): ' + error)
    })
  })
};
