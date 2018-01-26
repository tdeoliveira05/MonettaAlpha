// THIS IS THE SERVER [ROUTER FILE] //
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const assert = require('assert')
const bcrypt = require('bcrypt')
const watson = require('watson-developer-cloud')
const config = require('config')
const yes = require('yes-https')
const { SlackOAuthClient } = require('messaging-api-slack')
const Users = require('./models/userModel.js')
const Meetings = require('./models/meetingModel.js')
const Feedbacks = require('./models/feedbackModel.js')
const Codes = require('./models/codeModel.js')
const jwt = require('jsonwebtoken')

//Amazon requirements
const AWS = require('aws-sdk')
AWS.config.region = process.env.REGION

//initialize general app
const app = express();

// Import entire directory of server logic and tools
const requireDir = require('require-dir')
const serverLogic = requireDir('./serverLogic', {recurse: true}) // special node module to import entire directory and their sub directories
const serverUtility = requireDir('./serverUtility', {recurse: true}) // special node module to import entire directory and their sub directories

//Establishing middleware
app.use(cors())
app.use(bodyParser.json())

//Serving files
const indexPath = path.join(__dirname, './dist/index.html');
const publicPath = express.static(path.join(__dirname, './dist'));

const sslPath = path.join(__dirname, './dist/well-known/acme-challenge/RFPs8WP09KT0cJbTNCJgs2V42_7lKd_2UfJLdK3RBc8');
const sslPath1 = path.join(__dirname, './dist/well-known/acme-challenge/Z0pKihI7Gm3awBh08SD7ayfBToWPnLEjukRzWbHuW-E');

app.use('/', publicPath);

app.get('/', function(_,res){ res.sendFile(indexPath) });

app.get('/.well-known/acme-challenge/RFPs8WP09KT0cJbTNCJgs2V42_7lKd_2UfJLdK3RBc8', function(_,res){ res.sendFile(sslPath) });
app.get('/.well-known/acme-challenge/Z0pKihI7Gm3awBh08SD7ayfBToWPnLEjukRzWbHuW-E', function(_,res){ res.sendFile(sslPath1) });

//Constants from config
const dbConfig = config.get('Customer.dbConfig');
const saltRounds = 10;
const codes = config.get('Presets.codes');
const port = config.get('Presets.port')
const secret = config.get('Presets.secret')
console.log('Config:'+dbConfig.uri)

// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.uri, {
  UseMongoClient: true
}).catch(function(err){
  console.log(err)
});
mongoose.connection.once('open',function(){
	console.log('Connection made');
}).on('error',function(error){
	console.log('Connection error',error);
});

//----------------------------------------------------------------------------//
//-------------------------SERVER DEPLOYMENT PROCEDURES-----------------------//
//----------------------------------------------------------------------------//

if(process.env.NODE_ENV=='production') app.use(yes());;

//----------------------------------------------------------------------------//
//--------------------------------SERVER ROUTES-------------------------------//
//--------------------------------LOGIN/SIGNUP--------------------------------//
/* -----------------------------------------------------------------------------
Processes a login request
Process =>
1. Checks the database for a username matching the one typed by the username
2. Compares the attempted password to the password in the retrieved user document
3. Allows login if sucessful

SECURITY RISK - server only needs to send a username to front-end to force a login

-------------------

inputObject = req.body = {
username: STRING,
password: STRING
}

Success:

outputObject = res.data = {
  token: String,         //User token
  fullName: String,
  email: String
}

Failure:

outputObject = res.data = {
  errors: true
  usernameError: STRING,
  passwordError: STRING
}

*/

app.post('/request/login',function(req, res){
  console.log('requested login')
  console.log(req.headers)
	serverLogic.requestLogin(req, res)
})

/* -----------------------------------------------------------------------------
Processes a signup request
Process =>
1. Check if username is taken up
2. Validate the attempted signup code
3. Create a new user document with the input data
4. Save the user document to the database
5. Update the code document correspondent to the new user document

-------------------

inputObject = req.body = {
username: STRING,
password: STRING,
codeUsed: STRING
}

Success:

outputObject = res.data = {
  token: String,         //User token
  fullName: String,
  email: String
}

Failure:

outputObject = res.data = {
  errors: true
  usernameError: String,
  passwordError: String
}
*/

app.post('/request/signup', function(req, res) {
  console.log('requested signup')
  serverLogic.requestSignup(req, res)
})

/* -----------------------------------------------------------------------------
Processes an alpha trial request
Process =>
1. parses data into an email
2. sends to team@monettatech.com

-------------------

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

outputObject = res = {
data: STRING // response from server
}
*/

app.post('/request/alpha', function(req, res) {
  serverLogic.requestAlpha(req, res)
})



//--------------------------AUTHENTICATION MIDDLEWARE-------------------------//
// This function will authenticate every user looking to use any post/get route
// that follows underneath using the protectRoute router
// token always needs to be sent with the request if the client-side is making
// a request


app.post('/authenticateMe',  function(req, res) {
  var tokenArray = req.body.token.split(' ')
  var token = tokenArray[1]
  console.log('--------------------------------------------')
  console.log('Token found')
  console.log('--')
  console.log('authenticating: ' + token)
  console.log('--')

  jwt.verify(token, secret, (error, authData) => {
    if (error) {
      console.log('could not authenticate user - ' + error)
      res.send({success: false, errorText: error})
    } else {
      console.log('User: ' + authData.username + ' was already logged in')
      Users.findOne({_id: authData.id})
      .then((userDoc) => {
        console.log('SUCESSFULLY AUTHENTICATED USER')
        console.log('--------------------------------------------')
        res.send({success: true, errorText: '', fullName: userDoc.firstName + ' ' + userDoc.lastName, username: userDoc.username})
      })
    }

  })
  console.log('--------------------------------------------')
})

// this must be after the request routes. those three routes do not need a jwt to user
// all of the routes below NEED a jwt so we are going to authenticate that jwt before it reaches the route
// if it is wrong we are blocking it, if it is correct we are letting it through
app.use(function (req, res, next) {
  console.log('-------------------- AUTHENTICATION MIDDLEWARE ------------------------')
  console.log('path: ' + req.path)
  console.log('--------------------------------')

  if (!req.headers.access_token) {
      console.log(req.headers)
      console.log('ERROR')
      console.log('no access_token found - route blocked')

  } else {

    const bearerHeader = req.headers.access_token
    const bearer       = bearerHeader.split(' ')
    const token        = bearer[1]
    console.log('current localStorage bearer token: ' + token)

      jwt.verify(token, secret, (error, authData) => {
        if (error) {
          console.log('error was found: ' + error)
          console.log('------------> redirecting')
          res.sendFile(indexPath)
        } else {
          console.log('no error found')
          console.log('------------> allowing route')
          next()
        }
      })

  }
  console.log('-------------------------------------------------------------------------')
})

//-----------------------------ROUTES CONTINUED-------------------------------//
/* -----------------------------------------------------------------------------
Updates user document with additional information
Process =>
1. finds the user document in database
2. updates relevant fields

-------------------

inputObject = req.body = {
  updateObj: {      // any field inside this object must have the same names as the user model, the route will loop through and update depending on this object's keys
    firstName: ...
    lastName: ...
    ETC
  }
}

outputObject = req.body = {
  sucess: BOOLEAN,
  errorText: STRING
}

}*/

app.post('/userDocument/update', function(req,res) {
	serverLogic.updateUserDoc(req, res)
})
/* -----------------------------------------------------------------------------
Enters a new meeting into the database
Process =>
1. Creates a new meeting document using the meeting schema
2. Saves the resultant meeting document to database

-------------------

inputObject = req.body = {
  title: String,
  host: { fullName: String, email: String},
  participants: [{
    fullName: String,
    email: String,
    guest: Boolean
  }],
  date: {type: String, default: Date.now()},
  location: String,
  goals: [{
    text: String,
    completed: Boolean,
    completionTimeStamp: Number,
    metaData: Object
  }],
  notes: [{
      text: String,
      category: String,
      timeStamp: Number,
      formattedTimeStamp: String,
      metaData: Object
  }],
  metaData: {starred: Boolean, category: String},
  meetingStats: {
    timeElapsed: {
      actualDuration: Number,
      formattedActualDuration: String,
      expectedDuration: Number,
      formattedExpectedDuration: String
    }
  }
}

outputObject = req.body = {
  sucess: Boolean,
  errorText: String
}

}*/

app.post('/meetingDocument/submit', function(req,res) {
	serverLogic.submitNewMeeting(req, res)
})

/* -----------------------------------------------------------------------------
Finds and returns ALL meeting documents belonging to a host
Process =>
1. search DB for all meeting documents matching the host user
2. return a JSON.stringify(docArray) which is an array of meeting documents owned by the host user

-------------------

inputObject = req.body = usernameParam = {
  host {
    username: String,
    ...
  }
}


outputObject = res = {
data: meetingDocumentArray // sends back 'res.send(JSON.stringify(docArray))'
}*/

app.post('/meetingDocument/findByUser',function(req,res){
	serverLogic.findAllMeetingDocs(req, res)
})

/* -----------------------------------------------------------------------------
Finds and permanently deletes a meeting document from DB
Process =>
1. Finds the document in the database using the received _id
2. Deletes the found document from the database

SECURITY RISK - the user is requesting PERMANENT deletion of the chosen document

-------------------

inputObject = req.body = {
	targetDocumentId: String,        // id to delete
}

NO OUTPUT OBJECT
*/

app.post('/meetingDocument/deleteById',function(req,res){
	serverLogic.deleteMeetingDocById(req, res)
})

/* -----------------------------------------------------------------------------
Finds and updates a meeting document by overwriting it in the DB
Process =>
1.

SECURITY RISK - the user is requesting PERMANENT update of the chosen document

-------------------

inputObject = req.body = {
	targetDocument: Object,  // this is the ENTIRE target document, not just the updated piece
}

outputObject = res.data = sucessObject = {
  success: Boolean,
  errorText: String
}
*/

app.post('/meetingDocument/updateThisDocument', function(req,res){
	serverLogic.updateThisMeetingDoc(req, res)
})

/* -----------------------------------------------------------------------------
Enters a new meeting into the database
Process =>
1. Creates a new feedback document using the feedback schema
2. Saves the resultant feedback document to database
3. Sends message to Slack channel

-------------------


*/

app.post('/feedbackDocument/submit', function(req,res) {
  console.log('here')
	serverLogic.submitNewFeedback(req, res)
})


app.get('*', function (request, response){
    console.log('--ALL PURPOSE ROUTING--')
    response.sendFile(indexPath)
})

//----------------------------------------------------------------------------//
//---------------------------UTILITY FUNCTIONS--------------------------------//
//--------------------------proceed with caution------------------------------//
//----------------------------------------------------------------------------//
/*
if (false) {
  serverUtility.utilityFunction.dropDatabaseCollections()
  serverUtility.utilityFunction.enterDatabaseCodes(codes)
}
serverUtility.utilityFunction.enterDatabaseTestUser('thiago1@gmail.com', '1111', 'qwerty')
*/
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//------------------------------SERVER PORT-----------------------------------//

app.listen(process.env.PORT || port, function() {
	console.log('App listening on port', port)
})
