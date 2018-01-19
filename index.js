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
const User = require('./models/userModel.js')
const Meeting = require('./models/meetingModel.js')
const Feedback = require('./models/feedbackModel.js')
const Code = require('./models/codeModel.js')

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

outputObject = res = {
data: TOKEN_OBJ // JSON WEB TOKEN (JWT) for local storage
}

TOKEN_OBJ = {
  id: STRING,
  username: STRING,
  token: UNKNOWN // this is the JWT
}
*/

app.post('/request/login',function(req, res){
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
code: STRING
}

outputObject = res = {
data: TOKEN_OBJ // JSON WEB TOKEN (JWT) for local storage
}

TOKEN_OBJ = {
  id: STRING,
  username: STRING,
  token: UNKNOWN // this is the JWT
}
*/

app.post('/request/signup', function(req, res) {
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
/*
app.use(function(req, res, next) {
  console.log('Running authentication middleware.')
  var token = req.body.token || req.headers['token'];
  if (token) {
    jwt.verify(token, config.get('Presets.secret'), function(error, decode) {
      error ? res.status(500).send("Invalid token") : next();
    })
  } else {
    res.send('no token received')
  }
})
*/
//-----------------------------ROUTES CONTINUED-------------------------------//
/* -----------------------------------------------------------------------------
Enters a new meeting into the database
Process =>
1. Creates a new meeting document using the meeting schema
2. Saves the resultant meeting document to database

-------------------

inputObject = req.body = {
  title: String,
  host: { fullName: String, email: String},
  participants: [{fullName: String, email: String, guest: Boolean}],
  date: {type: String, default: Date.now()},
  location: String,
  goals: [{text: String, completed: Boolean, completionTimeStamp: Number}],
  notes: {
    general: [{text: String, type: String, color: String, timeStamp: Number, formattedTimeStamp: String}],
    action: [{text: String, type: String, color: String, timeStamp: Number, formattedTimeStamp: String}],
    decision: [{text: String, type: String, color: String, timeStamp: Number, formattedTimeStamp: String}],
    timeSorted: [{text: String, type: String, color: String, timeStamp: Number, formattedTimeStamp: String}],
  },
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

app.post('/enter/newMeeting', function(req,res) {
	serverLogic.enterNewMeeting(req, res)
})

/* -----------------------------------------------------------------------------
NOT CURRENTLY USED
Finds and returns ALL meeting documents belonging to a host
Process =>
1. search DB for all meeting documents matching the host user
2. return a JSON.stringify(docArray) which is an array of meeting documents owned by the host user

-------------------

inputObject = req.body = usernameParam = {
  hostUsername: ''
}


outputObject = res = {
data: meetingDocumentArray // sends back 'res.send(JSON.stringify(docArray))'
}*/

app.post('/get/allMeetingDocs',function(req,res){
  console.log('get route accessed')
  console.log(req.body)
	serverLogic.findAllMeetingDocs(req, res)
})



/* -----------------------------------------------------------------------------
NOT CURRENTLY USED
Finds multiple meeting document from DB base on certain parameters that are passed as an input obj
Process =>
1. Define search parameters requested by user
2. Search DB for meeting document matching parameters

-------------------

inputObject = req.body = searchParam
example of searchParam:
searchParam = {
              	username: STRING,
              	search: STRING,
              	searchType: STRING,
              	minDate: NUMBER,
              	maxDate: NUMBER
              }


outputObject = res = {
data: meetingDocumentArray // sends back 'res.send(JSON.stringify(docArray))'
}*/

app.post('/search',function(req,res){
	serverLogic.searchForMeetingDoc(req, res)
})

/* -----------------------------------------------------------------------------
NOT CURRENTLY USED
Finds and permanently deletes a meeting document from DB
Process =>
1. Finds the document in the database using the received _id
2. Deletes the found document from the database

SECURITY RISK - the user is requesting PERMANENT deletion of the chosen document

-------------------

inputObject = req.body = {
	_id: UNKNOWN // meeting document ID
}

NO OUTPUT OBJECT
*/

app.post('/deleteMeeting',function(req,res){
	serverLogic.deleteMeetingDoc(req, res)
})

/* -----------------------------------------------------------------------------
NOT CURRENTLY USED
Enters a new feedback document into the Database
Process =>
1. Creates a new feedback document using the Feedback Schema
2. Saves the resultant feedback document to the DB

-------------------

inputObject = req.body = {
username: STRING,
date: DATE_CONSTRUCTOR,
issue: STRING,
suggestion: STRING,
likes: STRING
}

outputObject = res = {
data: STRING // 'Feedback saved'
}
*/

app.post('/feedback',function(req,res){
	serverLogic.enterNewFeedback(req, res)
})

/* -----------------------------------------------------------------------------
NOT CURRENTLY USED
Emails users with their meeting minutes
Process =>
NOT OPTIMIZED

-------------------

inputObject = req.body = {
title: STRING,
type: STRING,
location: STRING,
date: DATE_CONSTRUCTOR,
members: ARRAY_STRINGS,
decisions: ARRAY_STRINGS,
actions: ARRAY_STRINGS,
minutes: ARRAY_STRINGS,
recipients: ARRAY_STRINGS
}

NO OUTPUT OBJECT
*/

app.post('/email/monettaMinutes', function(req,res){
	serverLogic.emailMonettaMinutes(req, res)
})

/* -----------------------------------------------------------------------------
NOT CURRENTLY USED
Counts the number of User documents in the database
Process =>
1. Defines Schema type to be a User schema
2. Counts how many documents in the database were made with the User Schema

-------------------

NO INPUT OBJECT

outputObject = res = {
  data: NUMBER
  }
}
*/

app.get('/usercount', function(req,res){
	serverLogic.countUsers(req, res);
})

/* -----------------------------------------------------------------------------
NOT CURRENTLY USED
Retrieve the IBM Watson Speech-to-text (STT) token for use
Process =>
1. Creates a watson constructor using 'new watson.AuthorizationV1({})'
2. Acesses the watson constructor's token value and returns it to client-side

-------------------

NO INPUT OBJECT

outputObject = res = {
  data: UNKNOWN // Token identifier
  }
}
*/
app.get('/token', function(req,res){
	serverLogic.getWatsonToken(req, res)
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
*/
// serverUtility.utilityFunction.enterDatabaseTestUser('sunny.p.panchal@gmail.com', '1111', 'qwerty')


//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//------------------------------SERVER PORT-----------------------------------//

app.listen(process.env.PORT || port, function() {
	console.log('App listening on port', port)
})
