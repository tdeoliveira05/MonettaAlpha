// This function will process a login request by a user
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (req, res) {

}

/*
inputObject = req.body = {
  username: STRING, // this is the email
  password: empty,
  codeUsed: empty,
  firstName: STRING,
  lastName: STRING,
  jobPosition: STRING,
  organization: STRING,
  referenceNotes: STRING
}
*/
