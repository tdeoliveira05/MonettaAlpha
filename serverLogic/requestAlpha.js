// This function will process a login request by a user
const requireDir = require('require-dir')
const serverTools = requireDir('./serverTools', {recurse: true}) // special node module to import entire directory and their sub directories

module.exports = function (applicantData, res) {

  serverTools.create.applicantDoc(applicantData)
  .then((newApplicantDoc) => {
    return serverTools.save.thisDoc(newApplicantDoc)
  })
  .then((newApplicantDoc) => {
    console.log('sending welcome email')
    return serverTools.email.applicantWelcome(newApplicantDoc)
  })
  .then((newApplicantDoc) => {
    console.log('sending admin email')
    var fullName            = newApplicantDoc.firstName + ' ' + newApplicantDoc.lastName
    var organization        = newApplicantDoc.organization
    var job                 = newApplicantDoc.jobPosition
    var reference           = newApplicantDoc.referenceNotes

    var informationSubject  = 'New alpha user'
    var informationHeading  = 'The following person just signed up for an alpha:'
    var informationString   = fullName + 'is from the company ' + organization + ' working as a ' + job + ' and found us by the following notes - ' + reference

    serverTools.email.adminNotice(informationSubject, informationHeading, informationString)
    res.status(200).send()
  })
  .catch((error) => {
    console.log('request' + error)
    res.send('requestAlpha ' + error)
  })

}
