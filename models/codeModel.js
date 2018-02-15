const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
  code: {type: String, unique: true},
  used:Boolean
}, {timestamps: true});



CodeSchema.plugin(uniqueValidator, {message: 'schemaModel[codeExists]'});

const Code = mongoose.model('code', CodeSchema);


module.exports = Code;
