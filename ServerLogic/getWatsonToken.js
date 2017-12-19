// This function will authenticate Watson account and retrieve the STT token
const requireDir = require('require-dir')
const serverTools = requireDir('./ServerTools', {recurse: true}) // special node module to import entire directory and their sub directories

const watson = require('watson-developer-cloud')

module.exports = function (feedbackData, res) {

  var auth = new watson.AuthorizationV1({
    "url": "https://stream.watsonplatform.net/speech-to-text/api",
    "username": "fbc390cc-ae44-4968-b839-4cd9c34bc201",
    "password": "dZAVMXe7gWKn"
  });

  auth.getToken(function(err,token){
    if(!token){
      console.log('error:', err);
    } else {
      res.send(token);
    }
  });

}
