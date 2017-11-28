'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var empleadoSchema = Schema({
    name : String,
    surname : String,
    role : String,
    image : String,
    year : Number
});

module.exports = mongoose.model('Empleado', empleadoSchema);
