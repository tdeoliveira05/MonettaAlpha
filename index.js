const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const assert = require('assert')
const User = require('./models/users')
const Meeting = require('./models/meetings')
const Feedback = require('./models/feedback')
const Code = require('./models/codes')
const bcrypt = require('bcrypt')
const watson = require('watson-developer-cloud')
const config = require('config')
const yes = require('yes-https')
const { SlackOAuthClient } = require('messaging-api-slack')
const createMinutesEmail = require('./app/containers/Email/MonettaMinutes/templates.js')

// Setting up snedgrid connection to send out email
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

//Middleware
app.use(cors())
app.use(bodyParser.json())

//Redirecting to https
if(process.env.NODE_ENV=='production') app.use(yes());;


//Serving files
const indexPath = path.join(__dirname, './dist/index.html');
const publicPath = express.static(path.join(__dirname, './dist'));

const sslPath = path.join(__dirname, './dist/well-known/acme-challenge/RFPs8WP09KT0cJbTNCJgs2V42_7lKd_2UfJLdK3RBc8');
const sslPath1 = path.join(__dirname, './dist/well-known/acme-challenge/Z0pKihI7Gm3awBh08SD7ayfBToWPnLEjukRzWbHuW-E');

app.use('/dist', publicPath);

app.get('/', function(_,res){ res.sendFile(indexPath) });

app.get('/.well-known/acme-challenge/RFPs8WP09KT0cJbTNCJgs2V42_7lKd_2UfJLdK3RBc8', function(_,res){ res.sendFile(sslPath) });
app.get('/.well-known/acme-challenge/Z0pKihI7Gm3awBh08SD7ayfBToWPnLEjukRzWbHuW-E', function(_,res){ res.sendFile(sslPath1) });
//OAuth
const slack = SlackOAuthClient.connect(
	'xoxb-248587322181-WkedBxz2LYOblHzscrV8tNj0'
);


if(process.env.NODE_ENV=='production') slack.postMessage('Feedback', 'Deployed');



//Constants
const dbConfig = config.get('Customer.dbConfig');
const saltRounds = 10;
const codes = config.get('Presets.codes');
const initalUsers = config.get('Presets.users');
const port = config.get('Presets.port')
console.log('Config:'+dbConfig.uri)
//console.log(codes)
//console.log(initalUsers)


// MongoDB Connection
mongoose.Promise = global.Promise;
/*
mongoose.connect(dbConfig.uri,{
	useMongoClient: true
}).catch(function(err){
	console.log(err)
});
*/
//Thiago testing

mongoose.connect('mongodb://localhost/mercurysquare', {
  UseMongoClient: true
}).catch(function(err){
  console.log(err)
});


mongoose.connection.once('open',function(){
	console.log('Connection made');
}).on('error',function(error){
	console.log('Connection error',error);
});


//Clearing DB on start up
/*
mongoose.connection.collections.users.drop(function(){
  console.log('users droppped');
});
mongoose.connection.collections.meetings.drop(function(){
  console.log('meetings droppped');
});
mongoose.connection.collections.codes.drop(function(){
  console.log('codes droppped');
});
mongoose.connection.collections.feedbacks.drop(function(){
  console.log('feedbacks droppped');
});
*/

//Adding Sign Up Codes
/*
codes.map((code) => {
	var newCode = new Code({
		code: code,
		used: false
	});
	console.log(newCode)
	newCode.save().then(function(){
		if(newCode.isNew === false){
			console.log('Code Added');
		};
	});
});
*/
/*
// Adding test users
bcrypt.hash('1234', saltRounds).then(function(hash){
	var user1 = new User({
		username: 'colin',
		password: hash
	});
	console.log(user1)
	user1.save().then(function(){
		if(user1.isNew === false){
			console.log('Sign Up Successful');
		};
	});
})

bcrypt.hash(initalUsers.testpassword, saltRounds).then(function(hash){
	var user2 = new User({
			username: initalUsers.testuser,
			password: hash
		});
	console.log(user2)
	user2.save().then(function(){
		if(user2.isNew === false){
			console.log('Sign Up Successful');
		};
	});
})
*/

//Save meeting
app.post('/save', function(req,res) {
	var meeting = new Meeting({
		title: req.body.title,
		type: req.body.type,
		date: req.body.date,
		location:req.body.location,
		groups: req.body.groups,
		chair: req.body.chair,
		members: req.body.members,
		minutes: req.body.minutes,
		actions: req.body.actions,
		decisions: req.body.decisions,
		username: req.body.username
	});
	meeting.save().then(function(){
		if(meeting.isNew === false){
			console.log('Saved');
		};
	}).catch(function(err){
		console.log(err)
	});
	res.send(JSON.stringify(meeting));
})

// User Login
app.post('/login',function(req,response){
	User.findOne({username:req.body.username}).then(function(result){
		if(result){
			bcrypt.compare(req.body.password, result.password).then(function(res){
				if(res) {
					console.log(req.body.username, 'is now Logged In')
					response.send(req.body.username)
				} else {
					response.send(JSON.stringify('User Exists'));
				}
			})
		} else {
			response.send('User not found');
		}
	}).catch(function(error){
		console.log('Error', error);
	});
})

//User Sign Up
app.post('/signup',function(req,res){
	console.log('Sign Up Attempt')
	Code.findOne({code:req.body.code}).then(function(codeResult){
		if(codeResult){
			if(!codeResult.used){
				User.findOne({username:req.body.username}).then(function(result){
					if(!result) {
						bcrypt.hash(req.body.password, saltRounds).then(function(hash){
							const hashPass = hash;
							var user = new User({
								username: req.body.username,
								password: hash,
								time:0
							});
							user.save().then(function(){
								if(user.isNew === false){
									console.log('Sign Up Successful');
									//Update the Code to be used
									Code.update({ _id:codeResult._id }, { used: true }, function (err, raw) {
									  if (err) return handleError(err);
									  console.log('The raw response from Mongo was ', raw);
									});
									res.send(JSON.stringify(user.username))
								} else {
									res.send('Sign Up Unsuccessful')
								}
							}).catch(function(err){
									console.log(err);
									res.send('Sign Up Unsuccessful')
							})
						})
					} else {
						console.log('User Exists')
						res.send('User Exists')
					}
				})
			} else{
				console.log("Code Already Used")
				res.send("Code Already Used")
			}
		} else{
			console.log("Code Doesn't Exist")
			res.send("Code Doesn't Exist")
		}
	}).catch(function(err){
		console.log(err)
	})
})

// Repo Search
app.post('/search',function(req,res){
	if(req.body.searchType === 'title'){
		Meeting.find({title: {$regex:req.body.search, $options: "i"},
									username:req.body.username,
									date: { $gt: req.body.minDate, $lt: req.body.maxDate }
								}).then(function(result){
			res.send(JSON.stringify(result))
		})
	} else if(req.body.searchType === 'member') {
		Meeting.find({members: {$in:[req.body.search]}, username:req.body.username}).then(function(result){
			res.send(JSON.stringify(result))
		})
	}	else {
		res.send("Search didn't work");
	}
})

//Delete Meeting
app.post('/delete',function(req,res){
	Meeting.remove({_id:req.body.id}).then(function(){
		Meeting.findOne({_id:req.body.id}).then(function(result){
			if(!result){
				res.send('Deleted')
			} else {
				res.send('Delete Unsuccessful')
			}
		})
	});
})

//Save Feedback
app.post('/feedback',function(req,res){
	var feedback = new Feedback({
		username: req.body.username,
		date: req.body.date,
		issue: req.body.issue,
		suggestion: req.body.suggestion,
		likes: req.body.likes
	});
	feedback.save().then(function(){
		if(feedback.isNew === false){
		};
	});
	slack.postMessage('Feedback',
		'Username: ' + req.body.username + '\n' +
		'Date: ' + req.body.date + '\n' +
		'Likes: ' + req.body.likes + '\n' +
		'Suggestion: ' + req.body.suggestion + '\n' +
		'Issue: ' + req.body.issue
	).catch((err)=>{
		console.log(err)
	});
	res.send(JSON.stringify('Feedback Saved'));
})

//Getting user answered promp questions Array to ensure user does not answer same prompt question twice
app.post('/loadqs', function(req, response) {
	User.findOne({username: req.body.username}).then(function(result){
		if (result === null || result === undefined) {
			response.send('no user found')
		} else {
		response.send(result)
		}
  }).catch(function(err){
    console.log(err)
  })
})

//Updating the user's prompt question list since they just answered a new question on the client side
app.post('/updateqs', function(req, response) {
	User.findOneAndUpdate({username: req.body.username}, {$push: {promptqs: req.body.newNumber}}, function(err, raw){
		if (err) return handleError(err);
		console.log('The raw response from Mongo was ', raw);
	})
})

// Creates and sends a templated email
// This is hack af we need a better way
app.post('/emailMonettaMinutes', function(req,response){
	var data = {
		title: req.body.title,
		type: req.body.type,
		location: req.body.location,
		date: new Date(req.body.date).toDateString(),
		members: req.body.members,
		decisions: req.body.decisions,
		actions: req.body.actions,
		minutes: req.body.minutes,
		recipients: req.body.recipients
	}

	var readyEmail = createMinutesEmail(data)

	const msg = {
	  to: data.recipients,
	  from: 'minutes@monettatech.com',
	  subject: 'Moneta Minutes from ' + data.date,
	  html: readyEmail
	};

	sgMail.send(msg)

	response.send(JSON.stringify(readyEmail))
})

app.post('/emailNewAlphaUser', function(req, response) {
	console.log(req.body)

	var data = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		position: req.body.position,
		company: req.body.company,
		reference: req.body.reference
	}

	console.log(data)

	var name= 'NAME: ' + data.firstName + ' ' + data.lastName
 	var email = 'EMAIL: ' + data.email
	var job = 'JOB POSITION: ' + data.position
	var company = 'COMPANY: ' + data.company
	var reference = 'REFERENCE: ' + data.reference

	var readyMail =  '</p>' + name + ' ' + email + ' ' + job + ' ' + company + ' ' + reference + ' ' +'</p>'

	const msg = {
		to: 'team@monettatech.com',
		from: 'newalphatesters@monettatech.com',
		subject: 'NEW ALPHA TESTER REQUEST: ' + data.firstName + data.lastName,
		html: readyMail
	}

	sgMail.send(msg)

	response.send(JSON.stringify(readyMail))
})



//Get Feedback
app.get('/feedback',function(req,res){
	Feedback.find({}).then(function(result){
		res.send(JSON.stringify(result))
	}).catch(function(err){
		console.log(err)
	});
})

//Dictation Time Save
app.post('/timesave', function(req,res){
	console.log('Called')
	User.findOne({username: req.body.username}).then(function(user){
		let newTime = 0;
		newTime = user.time + req.body.time;
		User.update({username: req.body.username}, {time: newTime}, {upsert: true}).then(function(err){
			res.send('Updated Time')
			console.log(err)
		})
	})
})

//Get users
app.get('/users', function(req,res){
	let users = []
	User.find({}).then(function(userResults){
		Meeting.find({}).then(function(meetingResults){
			for(let i=0;i<userResults.length;i++){
				let meetingCount = 0
				for(let j=0;j<meetingResults.length;j++){
					if(meetingResults[j].username==userResults[i].username){
						meetingCount++
					}
				}
				users.push({username:userResults[i].username,meetingCount:meetingCount,time:userResults[i].time})
			}
			console.log(users)
			res.send(JSON.stringify(users))
		}).catch(function(err){
			console.log(err)
		})
	}).catch(function(err){
		console.log(err)
	})
})

//Count users
app.get('/usercount', function(req,res){
	User.find({}).then(function(result){
		res.send(JSON.stringify(result.length))
	}).catch(function(err){
		console.log(err)
	});
})

//Get Speech to text token
app.get('/token', function(req,res){
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
})


// Server Port
app.listen(process.env.PORT || port,function() {
	console.log('App listening on port', port)
})

/*
//Thiago test
const PORT = '8080';
app.listen(PORT, () => {
  console.log('Server started on localhost port: ' + PORT);
})
 module.exports = app;
 */
