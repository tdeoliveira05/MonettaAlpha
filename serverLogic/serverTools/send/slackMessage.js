// This function will send a message to the team's slack
// webhook: https://hooks.slack.com/services/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 for feedback channel
const {IncomingWebhook} = require('@slack/client')
const feedbackNotification = new IncomingWebhook('https://hooks.slack.com/services/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')

/*
messageData = {
  message: STRING,
  location: STRING,
  username: STRING
}
*/
module.exports = function (messageData) {
  return new Promise (function(resolve, reject) {

    var message = ' - ' + messageData.username + ' - \n - While in (' + messageData.location + ') - \n \n ' + messageData.message
    feedbackNotification.send(message, (error, response) => {
      if (error) {
        reject(error)
      } else {
        resolve('message sent')
      }
    })

  })
};
