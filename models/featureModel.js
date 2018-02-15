const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
  title: {type: String, default: ''},
  originalRequester: {
    fullName: {type: String, required: true},
    username: {type: String, required: true},
    originalDescription: {type: String, default: ''}
  },
  description: {type: String, default: ''},
  status: {type: String, default: 'notApproved'},
  totalVotes: {type: Number, default: 0},
  comments: {type: Array, default: []},
  requestedOn: {type: Date, default: new Date}
}, {timestamps: true});

const Feature = mongoose.model('feature', FeatureSchema);


module.exports = Feature;


/*

comments: [
  {
    timestamp: Number,
    text: String,
    username: String,
    fullName: String
  }
]

*/
