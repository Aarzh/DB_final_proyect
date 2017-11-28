'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tareaSchema = Schema({
    title : String,
    description : String,
    date : Number,
    state : String,
    empleado: { type: Schema.ObjectId, ref: 'Empleado'}
});

module.exports = mongoose.model('Tarea', tareaSchema);
