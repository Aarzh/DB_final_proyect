'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comandanteSchema = Schema({
    name : String,
    surname : String,
    department : String,
    image : String,
    state : String,
    year : Number
});

module.exports = mongoose.model('Comandante', comandanteSchema);
