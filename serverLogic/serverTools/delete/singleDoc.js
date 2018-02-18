// This function will delete a saved meeting from the DB
const Meeting = require('../../../models/meetingModel')

module.exports = function (Schema, paramObj) {
  return new Promise (function(resolve, reject) {
    console.log('parameter object: ')
    console.log(paramObj)

    Schema.remove(paramObj)
    .then(() => {
      console.log('sucess deleting doc matching: ' + paramObj)
      resolve({success: true, errorText: ''})
    })
    .catch((error) => {
      reject({success: true, errorText: error})
    })
  })
}
