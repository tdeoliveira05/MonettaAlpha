const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
  code:String,
  used:Boolean
}, {timestamps: true});

const Code = mongoose.model('code', CodeSchema);


module.exports = Code;
