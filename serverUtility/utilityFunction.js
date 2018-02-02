const Code = require('../models/codeModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Drop database function
exports.dropDatabaseCollections = function() {

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
	mongoose.connection.collections.applicants.drop(function(){
	  console.log('feedbacks droppped');
	});

}

//Function to add sign up codes
exports.enterDatabaseCodes = function (codes) {
	codes.map((code) => {
		var newCode = new Code({
			code: code,
			used: false
		})
		console.log(newCode)
		newCode.save().then(function(){
			if(newCode.isNew === false){
				console.log('Code Added: ' + newCode.code)
			}
		})
	})
}

// Function to Add a test user to a DB
exports.enterDatabaseTestUser = function(testUser, testPass, testCode) {
	bcrypt.hash(testPass, 10)
	.then((hash) => {
		var testUserDoc = new User ({
			username: testUser,
			password: hash,
			codeUsed: testCode
		})
		return testUserDoc.save()
	})
	.then(() => {
		console.log('Test user created: ' + testUser + '//' + testPass)
	})
	.catch((error) => {
		console.log('ERROR(server utility functions): ' + error)
	})
}

// Function to create a JSON web token for a user

// Function to validate a JSON web token
