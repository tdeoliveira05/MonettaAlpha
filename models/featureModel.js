const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  approved: {type: Boolean, default: false},
  totalVotes: {type: Number, default: 0},
  comments: {type: Array, default: []}
}, {timeStamp: true});

const Feature = mongoose.model('feature', FeatureSchema);


module.exports = Feature;


/*

comments: [
  {
    timestamp: Number,
    text: String,
    username: String
  }
]

*/
