const mongoose = require('mongoose');
const config = require('config')

//Create Schema and Model
const ApplicantSchema = new mongoose.Schema({
  username: {type: String, lowercase: true},
  firstName: String,
  lastName: String,
  jobPosition: String,
  organization: String,
  referenceNotes: String,
  activatedProfile: {type: Boolean, default: false}
}, {timestamps: true});

const Applicant = mongoose.model('applicant', ApplicantSchema);

module.exports = Applicant;
