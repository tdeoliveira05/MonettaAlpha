// This function will create a new feedback document
const Applicant = require('../../../models/applicantModel')

module.exports = function (applicantData) {
  return new Promise (function(resolve, reject) {

    var newApplicantDoc = new Applicant({
      username: applicantData.body.username,
      firstName: applicantData.body.firstName,
      lastName: applicantData.body.lastName,
      jobPosition: applicantData.body.jobPosition,
      organization: applicantData.body.organization,
      referenceNotes: applicantData.body.referenceNotes,
      activatedProfile: false
    });

    if (newApplicantDoc) {
      resolve(newApplicantDoc)
    } else {
      reject('create.applicantDoc.js): Applicant content is empty and not created')
    }
  })
};
