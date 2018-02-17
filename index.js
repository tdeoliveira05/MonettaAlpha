// THIS IS THE SERVER [ROUTER FILE] //------------------------------------------
// initializing express app + http server + web socket-----------------------
const express = require('express')
const app     = express()                      // APP
const server  = require('http').Server(app)    // SERVER
const io      = require('socket.io')(server)   // WEBSOCKET
//------------------------------------------------------------------------------
const cors                 = require('cors')
const axios                = require('axios')
const path                 = require('path')
const bodyParser           = require('body-parser')
const mongoose             = require('mongoose')
const assert               = require('assert')
const bcrypt               = require('bcrypt')
const watson               = require('watson-developer-cloud')
const config               = require('config')
const yes                  = require('yes-https')
const { SlackOAuthClient } = require('messaging-api-slack')
const jwt                  = require('jsonwebtoken')
const fs                   = require('fs')
const googleCloudSpeechAPI = require('@google-cloud/speech')
const helmet               = require('helmet')
const Feature              = require('./models/featureModel.js')
const User                 = require('./models/userModel.js')
const Meeting              = require('./models/meetingModel.js')
const Code                 = require('./models/codeModel.js')
const cookie               = require('cookie')

//------------------------------------------------------------------------------
// Import entire directory of server logic and tools
const requireDir    = require('require-dir')
const serverLogic   = requireDir('./serverLogic', {recurse: true}) // special node module to import entire directory and their sub directories
const serverUtility = requireDir('./serverUtility', {recurse: true}) // special node module to import entire directory and their sub directories


// Initialize speech client and pass service_account.json to it for authentication
const speech = new googleCloudSpeechAPI.SpeechClient({
  keyFilename: path.join(__dirname, './config/service_account.json')
})

//Establishing middleware
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

//Serving files
const indexPath = path.join(__dirname, './dist/index.html');
const publicPath = express.static(path.join(__dirname, './dist'));

//const sslPath = path.join(__dirname, './dist/well-known/acme-challenge/RFPs8WP09KT0cJbTNCJgs2V42_7lKd_2UfJLdK3RBc8');
//const sslPath1 = path.join(__dirname, './dist/well-known/acme-challenge/Z0pKihI7Gm3awBh08SD7ayfBToWPnLEjukRzWbHuW-E');

app.use('/', publicPath);

app.get('/', function(_,res){ res.sendFile(indexPath) });

//app.get('/.well-known/acme-challenge/RFPs8WP09KT0cJbTNCJgs2V42_7lKd_2UfJLdK3RBc8', function(_,res){ res.sendFile(sslPath) });
//app.get('/.well-known/acme-challenge/Z0pKihI7Gm3awBh08SD7ayfBToWPnLEjukRzWbHuW-E', function(_,res){ res.sendFile(sslPath1) });

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
PURPOSE:
This route processes a request to login

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
	serverLogic.requestLogin(req, res)
})

/* -----------------------------------------------------------------------------
PURPOSE:
This route processes a request to sign up

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
PURPOSE:
This route processes a request to join the alpha user base

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
// cookies are used for authentication


app.post('/authenticate',  function(req, res, next) {
  serverLogic.authenticate (req, res, next)
})

// this must be after the request routes. those three routes do not need a jwt to user
// all of the routes below NEED a jwt so we are going to authenticate that jwt before it reaches the route
// if it is wrong we are blocking it, if it is correct we are letting it through


//-----------------------------ROUTES CONTINUED-------------------------------//
/* -----------------------------------------------------------------------------
PURPOSE:
This route updates the information of a user who has logged in for the first time
updating their first/last name and adding an organization + job position field

-------------------

inputObject = req.body = {
  updateObj: {
    firstName: STRING
    lastName: STRING
    organization: STRING
    jobPosition: STRING
  }
}

outputObject = successObj = req.body = {
  sucess: BOOLEAN,
  errorText: STRING
}

*/

app.post('/secure/userDocument/updateInfo', function(req,res) {
	serverLogic.updateUserDocInfo(req, res)
})

/* -----------------------------------------------------------------------------
PURPOSE:
This route overwrites the logged in user's settings in their user document

-------------------

inputObject = req.body = {
  updateObj: {
    settings: Object
  }
}

outputObject = successObj = req.body = {
  sucess: BOOLEAN,
  errorText: STRING
}

}*/

app.post('/secure/userDocument/updateSettings', function(req,res) {
	serverLogic.updateUserSettings(req, res)
})

/* -----------------------------------------------------------------------------
PURPOSE:
This route returns the logged in user's settings from their document
-------------------

NO INPUT OBJECT (JSON web token is used for identification)

outputObject = req.body = {
  sucess: BOOLEAN,
  errorText: STRING,
  settings: OBJECT
}

}*/

app.post('/secure/userDocument/getSettings', function(req,res) {
	serverLogic.getUserSettings(req, res)
})
/* -----------------------------------------------------------------------------
PURPOSE:
This route returns the logged in user's entire document

-------------------

NO INPUT OBJECT (JSON web token is used for identification)

outputObject = req.body = {
  sucess: BOOLEAN,
  errorText: STRING,
  userDoc: OBJECT
}

}*/

app.post('/secure/userDocument/getUserDoc', function(req,res) {
	serverLogic.getUserDoc(req, res)
})
/* -----------------------------------------------------------------------------
PURPOSE:
This route submits a new meeting document to the database

-------------------

inputObject = req.body = {
  title: ...,
  etc...
  see meetingModel.js for structure
}

outputObject = req.body = {
  sucess: Boolean,
  errorText: String
}

}*/

app.post('/secure/meetingDocument/submit', function(req,res) {
	serverLogic.submitNewMeeting(req, res)
})

/* -----------------------------------------------------------------------------
PURPOSE:
This route returns all of the meeting documents pertaining to the logged in user
the documents can be sorted or filtered depending on client requirements

-------------------

inputObject = req.body = {
  sortObj: {
    type: 'title' || 'location' || 'date',    <------ only these keys are able to be used for now
    order: 'asc' || 'desc'
  },
  filterObj: {
    date: {greaterThan: NUMBER, lessThan: NUMBER},
    participants: {equals: name},
    location: {equals: name},

  }
}

outputObject = res = {
data: meetingDocumentArray // sends back 'res.send(JSON.stringify(docArray))'
}*/

app.post('/secure/meetingDocument/findByUser',function(req,res){
	serverLogic.findAllMeetingDocs(req, res)
})

/* -----------------------------------------------------------------------------
PURPOSE:
This route deletes a meeting document using its _id

-------------------

inputObject = req.body = {
	targetDocumentId: String,        // id to delete
}

NO OUTPUT OBJECT
*/

app.post('/secure/meetingDocument/deleteById',function(req,res){
	serverLogic.deleteMeetingDocById(req, res)
})

/* -----------------------------------------------------------------------------
PURPOSE:
This route overwrites an entire meeting document

-------------------

inputObject = req.body = {
	targetDocument: Object,  // this is the ENTIRE target document, not just the updated piece
}

outputObject = res.data = sucessObject = {
  success: Boolean,
  errorText: String
}
*/

app.post('/secure/meetingDocument/overwriteThisDocument', function(req,res){
	serverLogic.overwriteThisMeetingDoc(req, res)
})

/* -----------------------------------------------------------------------------
PURPOSE:
This route submits a new feedback document to the database

-------------------

inputObject = req.body = {
  feedback: {
    message: String,
    location: String
  }
}

outputObject = successObj = res.data = {
  success: Boolean,
  errorText: String
}
*/

app.post('/secure/feedbackDocument/submit', function(req,res) {
	serverLogic.submitNewFeedback(req, res)
})


/* -----------------------------------------------------------------------------
PURPOSE:
This route updates a feature document with a new comment made by the logged in
user.

-------------------

inputObject = req.body = {
  featureId: String,
  text: String
}

outputObject = res.data = {
  sucess: Boolean,
  errorText: String
}
*/

app.post('/secure/featureDocument/submitComment', function (req, res) {
  console.log('reached feature comment submit')
  serverLogic.submitFeatureComment(req, res)

})
/* -----------------------------------------------------------------------------
PURPOSE:
This route submis a new requested feature document into the database
which is automatically assigned to "notApproved"

-------------------

inputObject = req.body = {
  title: String,
  description: String
}

outputObject = res.data = {
  sucess: Boolean,
  errorText: String
}
*/

app.post('/secure/featureDocument/submit', function (req, res) {
  console.log('reached feature comment submit')
  serverLogic.submitNewFeature(req, res)

})

/* -----------------------------------------------------------------------------
PURPOSE:
This route will overwrite an old feature document with the new feature document
-------------------

inputObject = req.body = {
  featureDoc: Object
}

outputObject = res.data = {
  sucess: Boolean,
  errorText: String
}
*/

app.post('/secure/featureDocument/overwrite', function (req, res) {
  console.log('reached feature document overwrite')

  serverLogic.serverTools.overwrite.thisFeatureDoc(req.body.featureDoc)
  .then((results) => res.send({success: true, errorText: ''}))
  .catch((error) => res.send({success: false, errorText: ''}))

})

/* -----------------------------------------------------------------------------
PURPOSE:
This route will update a feature document's total votes based on the logged in user's input

-------------------

inputObject = req.body = {
  featureId: String,
  userVote: Number  // (-1 || 1)
}

outputObject = res.data = {
  sucess: Boolean,
  errorText: String
}
*/

app.post('/secure/featureVoteUpdate', function (req, res) {
  console.log('reached feature vote update')
  serverLogic.featureVoteUpdate(req, res)

})

/*--------------------------------ADMIN ROUTES--------------------------------*/

app.post('/secure/admin/getDocs', function (req, res) {
  console.log('reached ADMIN getDocs')
  // REVISE THIS ****************************************************************
  // begin all promises and use lean() to make query faster
  var userCursor = User.find().lean()
  var meetingPromise = Meeting.find().lean()
  var featurePromise = Feature.find().lean()
  var codePromise = Code.find().lean()

  // wait for all promises to finish before sending a response
  Promise.all([userPromise, meetingPromise, featurePromise, codePromise])
  .then(([userDocsVal, meetingDocsVal, featureDocsVal, codeDocsVal]) => {
    console.log('retrieved all admin objects')
    res.send({
      userDocs: userDocsVal,
      meetingDocs: meetingDocsVal,
      featureDocs: featureDocsVal,
      codeDocs: codeDocsVal
    })
  })
  .catch((error) => {
    console.log(error)
    res.send({success: false, errorText: error})
  })


})

app.post('/secure/admin/updateCodeDocs', function (req, res) {
  console.log('reached ADMIN updateCodeDocs')
  if (req.body.add) {
    addDocs = req.body.add
    req.body.add.map((codeVal) => {

      var newCodeDoc = new Code ({
        code: codeVal.toLowerCase(),
        used: false
      })

      newCodeDoc.save().catch((error) => res.send(error))
    })
  }


  if (req.body.remove) {
    Code.remove({_id: req.body.remove}).catch((error) => res.send(error))
  }

  res.send()

})

/* --------------------ALL PURPOSE ROUTING (NON-SECURE ROUTEs)----------------*/

app.get('*', function (request, response) {
    console.log('--ALL PURPOSE ROUTING--')
    response.sendFile(indexPath)
})

//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
/* ------------------------------WEB SOCKET-----------------------------------*/
//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//



io.use(function (socket, next) {
  console.log('-')
  console.log('*******************************************************')
  console.log('HANDSHAKE MIDDLEWARE (AUTHENTICATION)')
  console.log('-')

  console.log(socket.handshake)
  next()

  console.log('-')
  console.log('*******************************************************')
  console.log('-')
})

io.on('connection', function (socket) {
// This is where all socket functionality and the socket's lifecyle is built
  console.log('ONE USER CONNECTED' + socket.id)

  /*---------------------------------------------------------------------------
  Real time feature document functions

  socket.emit('receiveAllFeatureDocs', featureListObj) will send out an object:
  featureListObj = {
  approved: [...],
  notApproved: [...],
  remove: [...],
  finished: [...]
  }

  Both lists are sorted by descending totalVotes
  */
  socket.on('getAllFeatureDocs', function returnAllFeatureDocs(socket, data) {
    // this command takes a little while to process so it needs to be structure as a promise to act on socket.emit only after query returns
    serverLogic.returnAllFeatureDocs()
    .then((featureListObj) => {
      socket.emit('receiveAllFeatureDocs', featureListObj)
    })
    .catch((error) => console.log(error))
  })

  /*---------------------------------------------------------------------------
  Saves one second to the totalTimeInApp of the user
  */
  socket.on('saveOneSecond', function (usernameObj) {
    User.update(
      {username: usernameObj.username},
      {
        $inc: {"data.appUsage.totalTimeInApp": +1000}
      }
    )
    .catch((error) => console.log(error))
  })

  /*---------------------------------------------------------------------------
  Updates a user login's history
  */
  socket.on('update/userDocument/loginHistory', function (usernameObj) {
    // write here
  })

  //---------------------VOICE RECOGNITION------------------------------------//
  var recognizeStream = null

  socket.on('startGoogleCloudSpeech', function () {
    console.log('Google Cloud speech API initializing...')

    const request = {
      config : {
        encoding: 'LINEAR16',
        sampleRateHertz: '16000',
        languageCode: 'en-US'
      },
      interimResults: true
    }

    recognizeStream = speech.streamingRecognize(request)
    .on('error', console.error)
    .on('data', function (data) {
      console.log('data received')
      console.log(data.results[0])
      io.sockets.emit('speechData', data);
    });
  })
  socket.on('audioStream', function (bufferChunk) {
    // If statement is to avoid index.js trigerring an error because reconizeStream is not yet defined and might not have a write() function
    //console.log(recognizeStream)
    //console.log('---------------------------------------')
    if (recognizeStream !== null) {
      recognizeStream.write(bufferChunk)
      // alternatives:
      //fs.createReadStream(bufferChunk).pipe(recognizeStream)
      //recognizeStream.write(bufferChunk)
    }
  })

  socket.on('stopGoogleCloudSpeech', function () {
    console.log('Google Cloud speech API shutting down...')
    // If statement is for same reason as above in socket.on('audioStream', funct...)
    if (recognizeStream !== null) {
      recognizeStream.end()
      recognizeStream = null
    }
  })
  //--------------------------------------------------------------------------//


})

//----------------------------------------------------------------------------//
//---------------------------BACKGROUND FUNCTIONS-----------------------------//
//----------------------------------------------------------------------------//
//____________________________________________________________________________//


//----------------Resetting weekly votes allowed for each user----------------//

function resetWeeklyVotes() {

  User.update(
    {},
    {$set: {"data.appUsage.weeklyVotesLeft": config.get('Presets.maximumWeeklyVotes')}},
    {multi:true}
  )
  .catch((error) => {
    console.log(error)
  })
  console.log('refreshed weekly votes')
}

// 1 week = 6.048e+8 milliseconds = 604,800,000
// run resetWeeklyVotes() every 7 days or
setInterval(resetWeeklyVotes, 604800000)

//----------------------------------------------------------------------------//



//----------------------------------------------------------------------------//
//---------------------------UTILITY FUNCTIONS--------------------------------//
//--------------------------proceed with caution------------------------------//
//----------------------------------------------------------------------------//

/*
if (false) {
  serverUtility.utilityFunction.dropDatabaseCollections()
  serverUtility.utilityFunction.enterDatabaseCodes(codes)
}


//serverUtility.utilityFunction.enterDatabaseTestUser('thiago1@gmail.com', '1111', 'qwerty')

// serverUtility.utilityFunction.enterDatabaseTestUser('sunny.p.panchal@gmail.com', '1111', 'qwerty')

*/

var featuresList = [
  {
    title: 'Download meeting minutes in PDF',
    description: 'description goes here',
    totalVotes: 10,
    comments: [
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      },
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      },
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      }
    ]
  },
  {
    title: 'Comprehensive productivity statistics',
    description: 'description goes here',
    totalVotes: 9,
    comments: [
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      },
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      },
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      }
    ]
  },
  {
    title: 'Ability to log in through Slack',
    description: 'description goes here',
    totalVotes: 7,
    comments: [
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      },
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      },
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      }
    ]
  },
  {
    title: 'Full transcription of meeting',
    description: 'description goes here',
    totalVotes: 6,
    comments: [
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      },
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      },
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      }
    ]
  },
  {
    title: 'Log in through LinkedIn',
    description: 'description goes here',
    totalVotes: 5,
    comments: [
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      },
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      },
      {
        timestamp: new Date(),
        text: 'Hooray for the superbowl',
        username: 'thiago@monettatech.com',
        fullName: 'Thiago De Oliveira'
      }
    ]
  }
]

// Clears current features
/*
mongoose.connection.collections.features.drop(function(){
  console.log('features droppped');
});


// Adds default features to the database manually for testing purposes (NOT FOR PRODUCTION)

featuresList.map((item) => {
  var feature

  feature = new Feature ({
    title: item.title,
    description: item.description,
    approved: true,
    totalVotes: item.totalVotes,
    comments: item.comments,
    originalRequester: {
      fullName: 'Thiago De Oliveira',
      username: 'thiago@monettatech.com',
      originalDescription: 'cool'
    }
  })

  feature.save()
  .then((result) => {
    console.log('sucessful save')
    console.log(result)
  })
  .catch((error) => {
    console.log('Error')
    console.log(error)
  })
})
*/


//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
//------------------------------SERVER PORT-----------------------------------//

server.listen(process.env.PORT || port, function() {
	console.log('App listening on port', port)
})
