// This function will take a newly made applicantDoc and email the applicant with a welcome email
const config = require('config')
const mailjet = require ('node-mailjet').connect(config.get('Mailjet.publicKey'), config.get('Mailjet.privateKey'))

module.exports = function (newApplicantDoc) {
  return new Promise (function(resolve, reject) {

    mailjet.post("send", {'version': 'v3.1'})
  	.request({
  		"Messages":[
  			{
  				"From": {
          					"Email": "team@monettatech.com",
          					"Name": "Team Monetta"
  				},
  				"To": [
        					{
        						"Email": newApplicantDoc.username,
        						"Name": JSON.stringify(newApplicantDoc.firstName + ' ' + newApplicantDoc.lastName)
        					}
  				],
  				"TemplateID": 293374,
  				"TemplateLanguage": true,
  				"Subject": "Entry into Monetta's Early Release ",
  				"Variables": {
                        "firstName": newApplicantDoc.firstName || "there"
          }
  			}
  		]
  	})
    .then(() => {
  		resolve(newApplicantDoc)
  	})
  	.catch((emailError) => {
  		reject('ERROR(email.applicantWelcome):' + emailError)
  	})


  }
)};

/*
const mailjet = require ('node-mailjet')
	.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
			{
				"From": {
					"Email": "team@monettatech.com",
					"Name": "Team Monetta"
				},
				"To": [
					{
						"Email": "passenger1@mailjet.com",
						"Name": "passenger 1"
					}
				],
				"TemplateID": 293374,
				"TemplateLanguage": true,
				"Subject": "Entry into Monetta's Early Release ",
				"Variables": {
      "firstName": "there"
    }
			}
		]
	})
request
	.then((result) => {
		console.log(result.body)
	})
	.catch((err) => {
		console.log(err.statusCode)
	})
*/
