'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var delincuenteSchema = Schema({
    name : String,
    surname : String,
    alias : String,
    loc : String,
    description : String,
    image: String
});

module.exports = mongoose.model('Delincuente', delincuenteSchema);
