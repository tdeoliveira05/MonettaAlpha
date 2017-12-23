// This function will create and send an email to team@monettatech.com
// with info about prospective new alpha testers

// NOT OPTIMIZED

const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

module.exports = function (req, res) {

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
	res.send(JSON.stringify(readyMail))
}


/*
app.post('/emailNewAlphaUser', function(req, response) {
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

*/
