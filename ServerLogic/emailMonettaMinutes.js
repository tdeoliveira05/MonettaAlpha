// This function will create and send an email to the meeting participants
// with their meeting minutes

// NOT OPTIMIZED

const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

module.exports = function (req, res) {
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

  res.send(JSON.stringify(readyEmail))
}


/*
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
*/
