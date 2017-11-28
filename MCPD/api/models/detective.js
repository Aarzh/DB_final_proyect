'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var detectiveSchema = Schema({
  name : String,
  surname : String,
  rank : String,
  description : String,
  year : Number,
  image : String

});

module.exports = mongoose.model('Detective', detectiveSchema);
