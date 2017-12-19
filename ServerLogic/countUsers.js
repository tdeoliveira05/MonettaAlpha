// This function will count the number of User documents in the database
const requireDir = require('require-dir')
const serverTools = requireDir('./ServerTools', {recurse: true}) // special node module to import entire directory and their sub directories
const Users = require('../models/users')

module.exports = function (req, res) {

  serverTools.countThis(Users)
  .then((countResult) => {
    res.send(countResult)
  })
  .catch((error) => {
    console.log('[countUsers.js]' + error)
  })
}
