// This function will take a newly made applicantDoc and email the applicant with a welcome email
const config = require('config')
const mailjet = require ('node-mailjet').connect(config.get('Mailjet.publicKey'), config.get('Mailjet.privateKey'))

module.exports = function (informationSubject, informationHeading, informationString) {
  return new Promise (function(resolve, reject) {
    mailjet.post("send", {'version': 'v3.1'})
  	.request({
  		"Messages":[
  			{
  				"From": {
  					"Email": "team@monettatech.com",
  					"Name": "Admin System"
  				},
  				"To": [
  					{
    					"Email": "team@monettatech.com",
    					"Name": "Admin System"
  					}
  				],
  				"TemplateID": 294856,
  				"TemplateLanguage": true,
  				"Subject": informationSubject || "Information",
  				"Variables": {
        "informationHeading": informationHeading || "no heading" ,
        "informationString": informationString || "no string"
      }
  			}
  		]
  	})
    .then(() => {
  		resolve()
      console.log('adminNotice resolve')
  	})
  	.catch((error) => {
      console.log('adminNotice reject')
  		reject(error)
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
					"Name": "Admin System"
				},
				"To": [
					{
						"Email": "passenger1@mailjet.com",
						"Name": "passenger 1"
					}
				],
				"TemplateID": 294856,
				"TemplateLanguage": true,
				"Subject": "Information",
				"Variables": {
      "informationHeading": "no heading",
      "informationString": "no string"
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
