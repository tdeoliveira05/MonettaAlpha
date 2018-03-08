// THIS IS THE SERVER [ROUTER FILE] //------------------------------------------
// initializing express app + http server + web socket-----------------------

//-------------------------PURE HTTP------------------------------------------//

const express = require('express')
const path    = require('path')
const fs      = require('fs')
const app     = express()                      // APP
const socket  = require('socket.io')
const server  = require('http').createServer(app)    // SERVER
const io      = socket.listen(server)   // WEBSOCKET
//------------------------------------------------------------------------------
const cors                 = require('cors')
const axios                = require('axios')
const bodyParser           = require('body-parser')
const mongoose             = require('mongoose')
const assert               = require('assert')
const bcrypt               = require('bcrypt')
const watson               = require('watson-developer-cloud')
const config               = require('config')
const yes                  = require('yes-https')
const { SlackOAuthClient } = require('messaging-api-slack')
const jwt                  = require('jsonwebtoken')
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

// SSL Secure Certification redirect
app.enable('trust proxy'); // enables X-Forwarded-Proto to be trusted
app.use(function(req, res, next) {
  if(process.env.NODE_ENV === 'production' && (req.get('X-Forwarded-Proto') !== 'https')) {
    // if node is deployed in production mode and the forwarded request is not https, redirect to https
    res.redirect('https://' + req.get('Host') + req.url);
  }
  else
    next();
});

// Cross-origin Resource Sharing (CORS) allows the server to receive requested for
// restricted resources (ex: fonts) from another domain outside the server domain
// Think embedding images and youtube videos into your website
app.use(cors())

// Parses request into a readable format, JSON
app.use(bodyParser.json())

// Initialize speech client and pass service_account.json to it for authentication
const speech = new googleCloudSpeechAPI.SpeechClient({
  keyFilename: path.join(__dirname, './config/service_account.json')
})


//Serving files
const indexPath = path.join(__dirname, './dist/index.html');
const publicPath = express.static(path.join(__dirname, './dist'));

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

app.use('/', publicPath);

app.get('/', function(_,res){ res.sendFile(indexPath) });

//----------------------------------------------------------------------------//
//-------------------------SERVER DEPLOYMENT PROCEDURES-----------------------//
//----------------------------------------------------------------------------//

// if(process.env.NODE_ENV=='production') app.use(yes());

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

	// check if this user is registering as an admin
	if (req.body.username.includes('@monetta.ai') && req.body.codeUsed.includes('ADMIN_' + config.get('Presets.secret'))) {
		// if username being registered is @monetta.ai email and uses the secret ADMIN_${SECRET} code, then run a different route
		console.log('REGISTERING ADMIN: ' + req.body.username)

		// remove the secret so it is not stored in the database and
		var newReq = req

		newReq.body.codeUsed = newReq.body.codeUsed.split('_')[0]

		serverLogic.requestSignupAdmin(newReq, res)
	} else {
		serverLogic.requestSignup(req, res)
	}
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
  serverLogic.authenticate(req, res, next)
})

// this must be after the request routes. those three routes do not need a jwt to user
// all of the routes below NEED a jwt so we are going to authenticate that jwt before it reaches the route
// if it is wrong we are blocking it, if it is correct we are letting it through


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
  console.log('io middleware prior to connection')
  var cookies = cookie.parse(socket.handshake.headers.cookie)
  if (cookies.access_token) {
    next()
  }
  /*
  console.log('-')
  console.log('*******************************************************')
  console.log('HANDSHAKE MIDDLEWARE (AUTHENTICATION)')
  console.log('-')

  console.log(socket.handshake)
  next()

  console.log('-')
  console.log('*******************************************************')
  console.log('-')
  */
})


// Declare a visitors list
var visitors = []

//Declare a logged in users list
var usersOnline = []

io.sockets.on('connection', async function (socket) {
  // This is where all socket functionality and the socket's lifecyle is built
  // update visitors list
  socket.userDoc = await serverLogic.authenticateSocket(socket)
  if (!visitors.includes(socket)) visitors.push(socket)

  console.log('Visitor connected:')
  console.log(visitors.length + ' visitors on the website')

  socket.use(async function (data, next) {
    // continuously update the user's doc embedded in the socket object
    try  {
      var currentUserDoc = await User.findOne({username: socket.userDoc.username}).lean()
      socket.userDoc = currentUserDoc
      next()
    } catch (error) {
      console.log('error in socket.use')
      console.log(error)
    }
  })



  // Process event listener to prevent server from crashing upon an uncaught error
  process.on('uncaughtException', (error) => {
    console.log('uncaught exception (socket)')
    socket.emit('errorCustom', '(ERROR 500) INTERNAL SERVER ERROR')
    console.log(error)
  })

  /*------------------------ASYNC MIDDLEWARE FUNCTION-------------------------*/

  // this will be a middleware function called on every socket.on event listener and
  // the sole purpose for it is to catch silent errors by forcing a promise.resolve
  // on the event handler in socket.on and if that promise fails with a reject() then
  // this catch block would catch it and submit it to express to prevent silent breakages
  const asyncMiddleware = fn =>
    (data) => {
      Promise.resolve(fn(data))
      .catch((error) => {
        console.log('ASYNCMIDDLEWARE ERROR')
        console.log('ERROR CODE: ' + error)
      })
    }

  /*------------------------------OTHER FUNCTIONS-----------------------------*/

  function getAndEmitUserDoc () {
    User.findOne({_id: socket.userDoc._id})
    .then((userDoc) => {
      console.log('emitting updated user doc')
      console.log(userDoc)
      socket.emit('response/secure/userDocument/getUserDoc', userDoc)
    })
    .catch((error) => {
      console.log(error)
    })
  }




  /* ---------------------------------------------------------------------------
  ** _____________ PROTOCOLS _____________ **
  This socket route will go through certain protocol functions like:
  - updating time spent inside the app for the user
  - updating the usersOnline list here in the io.connection
  - updating the activity of the login session of the user

  -------------------
  */
  socket.on('userLoginProtocols', asyncMiddleware(async function (data) {
    // if this user is not currently logged as an online user, log them
    if (!usersOnline.includes(socket)) {
      usersOnline.push(socket)
      console.log('User connected:')
      console.log(usersOnline.length + ' users online')
      socket.emit('response/secure/userDocument/getUserDoc', socket.userDoc)
    }
    // process the stats pertaining to length of log in for the user
    await serverLogic.serverTools.stats.processLoginTimer({username: socket.userDoc.username})
  }))

  socket.on('userLogoutProtocols', asyncMiddleware(async function(data) {
    if (usersOnline.includes(socket)) {
      usersOnline.splice(usersOnline.indexOf(socket), 1)
      console.log('User disconnected:')
      console.log(usersOnline.length + ' users online')
    }

  }))

  socket.on('userURLActivityProtocols', asyncMiddleware (async function (data) {
    await serverLogic.serverTools.stats.processUserURLActivity(data, socket.userDoc)
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route updates the information of a user who has logged in for the first time
  updating their first/last name and adding an organization + job position field

  -------------------

  inputObject = data = {
    updateObj: {
      firstName: STRING
      lastName: STRING
      organization: STRING
      jobPosition: STRING
    }
  }

  */

  socket.on('/secure/userDocument/updateInfo', asyncMiddleware(async function (data) {
    var successObj = await serverLogic.updateUserDocInfo(data, socket.userDoc)
    socket.emit('response/secure/userDocument/updateInfo', successObj)
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route overwrites the logged in user's settings in their user document

  -------------------

  inputObject = data = {
    updateObj: {
      settings: Object
    }
  }

  outputObject = successObj  = {
    sucess: BOOLEAN,
    errorText: STRING
  }

  }*/

  socket.on('/secure/userDocument/updateSettings', asyncMiddleware (async function (data) {
    console.log('updateSettings')
    var successObj = await serverLogic.updateUserSettings(data, socket.userDoc)
    socket.emit('response/secure/userDocument/updateSettings', successObj)
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route returns the logged in user's settings from their document
  -------------------

  NO INPUT OBJECT (JSON web token is used for identification)

  outputObject = data = {
    settings: OBJECT
  }

  }*/

  socket.on('/secure/userDocument/getPreferences', asyncMiddleware (async function (data) {
    console.log('trying to get preferences')
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route returns the logged in user's entire document

  -------------------

  NO INPUT OBJECT

  outputObject = data = {
    ...entire user document...
  }

  }*/

  socket.on('/secure/userDocument/getUserDoc', function(data) {
  	socket.emit('response/secure/userDocument/getUserDoc', socket.userDoc)
  })

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route updates the user's custom templates

  -------------------

  inputObject = data = {
  userPreferences: {...} //  the ENTIRE userPreferences root object of the user document model
}

  outputObject = succesObj = {
    success: Boolean,
    errorText: String
  }

  }*/

  socket.on('secure/userDocument/updateUserPreferences', asyncMiddleware(async function(data) {
    console.log('-----------socket route')
    //await serverLogic.updateUserPreferences(data, socket.userDoc)
    getAndEmitUserDoc()
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route submits a new meeting document to the database

  -------------------

  inputObject = req.body = {
    title: ...,
    etc...
    see meetingModel.js for structure
  }

  outputObject = sucessObject = {
    sucess: Boolean,
    errorText: String
  }

  }*/

  socket.on('/secure/meetingDocument/submit', asyncMiddleware (async function (data) {
    var successObj = await serverLogic.submitNewMeeting(data)
    socket.emit('response/secure/meetingDocument/submit', successObj)
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route returns all of the meeting documents pertaining to the logged in user
  the documents can be sorted or filtered depending on client requirements

  -------------------

  inputObject = data = {
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

  socket.on('/secure/meetingDocument/findByUser', asyncMiddleware (async (data) => {
      var outputObj = await serverLogic.findAllMeetingDocs(data, socket.userDoc)
      socket.emit('response/secure/meetingDocument/findByUser', outputObj)
    })
  )

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route deletes a meeting document using its _id

  -------------------

  inputObject = data = {
  	targetDocumentId: String,        // id to delete
  }

  NO OUTPUT OBJECT
  */

  socket.on('/secure/meetingDocument/deleteById', asyncMiddleware(async function (data) {
    var successObj = await serverLogic.deleteMeetingDocById(data)
    socket.emit('response/secure/meetingDocument/deleteById', successObj)
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route overwrites an entire meeting document

  -------------------

  inputObject = data = {
  	targetDocument: Object,  // this is the ENTIRE target document, not just the updated piece
  }

  outputObject = sucessObject = {
    success: Boolean,
    errorText: String
  }
  */

  socket.on('/secure/meetingDocument/overwriteThisDocument', asyncMiddleware (async function (data) {
    var successObj = await serverLogic.serverTools.overwrite.thisMeetingDoc(data.targetDocument)
    socket.emit('response/secure/meetingDocument/overwriteThisDocument', successObj)
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route submits a new feedback document to the database

  -------------------

  inputObject = data = {
    feedback: {
      message: String,
      location: String
    }
  }

  outputObject = successObj = {
    success: Boolean,
    errorText: String
  }
  */

  socket.on('/secure/feedbackDocument/submit', asyncMiddleware (async function (data) {
    var successObj = await serverLogic.submitNewFeedback(data, socket.userDoc)
    socket.emit('response/secure/feedbackDocument/submit', successObj)
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route updates a feature document with a new comment made by the logged in
  user.

  -------------------

  inputObject = data = {
    featureId: String,
    text: String
  }

  outputObject = successObj = {
    sucess: Boolean,
    errorText: String,
    misc: Object (from successful replacement)
  }
  */

  socket.on('/secure/featureDocument/submitComment', asyncMiddleware (async function (data) {
    var successObj = await serverLogic.submitFeatureComment(data, socket.userDoc)
    socket.emit('response/secure/featureDocument/submitComment', successObj)
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route submis a new requested feature document into the database
  which is automatically assigned to "notApproved"

  -------------------

  inputObject = data = {
    title: String,
    description: String
  }

  outputObject = successObj = {
    sucess: Boolean,
    errorText: String
  }
  */

  socket.on('/secure/featureDocument/submit', asyncMiddleware( async function (data) {
    var successObj = await serverLogic.submitNewFeature(data, socket.userDoc)
    socket.emit('response/secure/featureDocument/submit', successObj)
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route will overwrite an old feature document with the new feature document
  -------------------

  inputObject = data = {
    featureDoc: Object
  }

  outputObject = successObj = {
    sucess: Boolean,
    errorText: String
  }
  */

  socket.on('/secure/featureDocument/overwrite', asyncMiddleware (async function (data) {
    var successObj = await serverLogic.serverTools.overwrite.thisFeatureDoc(data.featureDoc)
    socket.emit('response/secure/featureDocument/overwrite', successObj)
  }))

  /* -----------------------------------------------------------------------------
  PURPOSE:
  This route will update a feature document's total votes based on the logged in user's input

  -------------------

  inputObject = data = {
    featureId: String,
    userVote: Number  // (-1 || 1)
  }

  outputObject = successObj = {
    sucess: Boolean,
    errorText: String
  }
  */

  socket.on('/secure/featureVoteUpdate', asyncMiddleware(async function (data) {
    var successObj = await serverLogic.featureVoteUpdate(data, socket.userDoc)
    socket.emit('response/secure/featureVoteUpdate', successObj)
  }))


  /* -----------------------------------------------------------------------------
  PURPOSE:
  This socket route will return all feature documents to the user who emitted a
  request

  -------------------

  INPUT:
  none

  OUTPUT:
  returned to origin of event

  featureListObj = {
    approved: [...],
    notApproved: [...],
    remove: [...],
    finished: [...]
  }

  note - the arrays are sorted by descending total votes
  */

  socket.on('getAllFeatureDocs', asyncMiddleware( async function (data) {
    var featureListObj = await serverLogic.returnAllFeatureDocs()
    socket.emit('receiveAllFeatureDocs', featureListObj)
  }))



  //==========================================================================//
  //===============================ADMIN SOCKET ROUTES========================//
  //==========================================================================//
  /* ---------------------------------------------------------------------------
  PURPOSE:
  This socket route will return all feature, code, meeting and user documents in mongo

  -------------------

  INPUT:
  none

  OUTPUT:
  returned to origin of event

  outputObject = featureListObj = {
    approved: [...],
    notApproved: [...],
    remove: [...],
    finished: [...]
  }

  note - the arrays are sorted by descending total votes
  */
  socket.on('/secure/admin/getDocs', async function (data) {

    // this is 4 mongo queries so we use Promise.all instead of async/await
    // async/await would make the entire event loop wait and do the 4 promises consecutively
    // Promise.all allows node to make use of its asynchronous nature and enjoy a performance boost

    var userDocPromise = User.find().lean()
    var meetingDocPromise = Meeting.find().lean()
    var featureDocPromise = Feature.find().lean()
    var codePromise = Code.find().lean()

    Promise.all([userDocPromise, meetingDocPromise, featureDocPromise, codePromise])
    .then(([userDocsVal, meetingDocsVal, featureDocsVal, codeDocsVal]) => {

      socket.emit('response/secure/admin/getDocs', {
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
  /* -----------------------------------------------------------------------------
  PURPOSE:
  This socket route will update the code documents in mongo when adding/removing/updating

  -------------------

  inputObject = data = {
    add: Array of Strings (the codes you wish to add),
    remove: String (a singular _id tag for the target doucment to be removed)
  }

  outputObject = successObj = {
    sucess: Boolean,
    errorText: String
  }


  */

  socket.on('/secure/admin/updateCodeDocs', async function (data) {
    try {
      if (data.add) {
        var addDocs = data.add
        data.add.map((codeVal) => {
          var newCodeDoc = new Code ({
            code: codeVal.toLowerCase(),
            used: false
          })

          newCodeDoc.save().catch((error) => console.log(error))
        })
      }

      if (data.remove) {
        Code.remove({_id: data.remove}).catch((error) => console.log(error))
      }

      socket.emit('response/secure/admin/updateCodeDocs')
    } catch (error) {
      console.log('error')
      console.log(error)
    }

  })


  //--------------------------------------------------------------------------//
  //---------------------VOICE RECOGNITION------------------------------------//
  //--------------------------------------------------------------------------//
  var recognizeStream = null

  socket.on('startGoogleCloudSpeech', () => {
    console.log('Google Cloud speech API initializing...')

    const request = {
      config : {
        encoding: 'LINEAR16',
        sampleRateHertz: '16000',
        languageCode: 'en-US',
        profanityFilter: true,
        speechContexts: [
          {
          "phrases":["action item", "decision"]
          }
        ]
      },
      interimResults: true
    }

    recognizeStream = speech.streamingRecognize(request)
    .on('error', console.error)
    .on('data', (data) => {
      console.log('data received from google API')
      // console.log(data.results[0])
      io.sockets.emit('speechData', data)
    })
  })

  socket.on('audioStream', (bufferChunk) => {
    // If statement is to avoid index.js trigerring an error because reconizeStream is not yet defined and might not have a write() function
    //console.log(recognizeStream)
    if (recognizeStream !== null) {
      recognizeStream.write(bufferChunk)
      // alternatives:
      //fs.createReadStream(bufferChunk).pipe(recognizeStream)
      //recognizeStream.write(bufferChunk)
    }
  })

  socket.on('stopGoogleCloudSpeech', () => {
    console.log('Google Cloud speech API shutting down...')
    // If statement is for same reason as above in socket.on('audioStream', funct...)
    if (recognizeStream !== null) {
      recognizeStream.end()
      recognizeStream = null
    }
  })

  socket.on('startHotWordInference', () => {
    console.log('Starting hot word inference')
  })

  socket.on('checkForHotWord', (bufferChunk) => {
    // TODO: move bufferChunk prep from client to server

    axios.post('http://flask-env.pjcvfng8mg.us-east-2.elasticbeanstalk.com/', {
    // axios.post('http://127.0.0.1:5000', {
      payload: bufferChunk
    })
    .then((response) => {
      console.log(response.data);
      io.sockets.emit('hotWordAPIResponse', response.data)
    })
    .catch((error) => {
      console.log(error.response)
    });
  })

  socket.on('stopHotWordInference', () => {
    console.log('----------------stopped hot word inference-----------')
  })

  //--------------------------------------------------------------------------//

  socket.on('disconnect', function (data) {
    visitors.splice(visitors.indexOf(socket), 1)
    usersOnline.splice(usersOnline.indexOf(socket), 1)
    console.log('Disconnected:')
    console.log(visitors.length + ' visitors on the website')
    console.log(usersOnline.length + ' users online')
  })

})
// End of socket
//____________________________________________________________________________//
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
*/

//serverUtility.utilityFunction.enterDatabaseTestUser('thiago1@gmail.com', '1111', 'qwerty')

// serverUtility.utilityFunction.enterDatabaseTestUser('sunny.p.panchal@gmail.com', '1111', 'qwerty')



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
