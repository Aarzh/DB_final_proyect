'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var caseSchema = Schema ({
    title : String,
    description : String,
    year : Number,
    loc : String,
    state : String,
    Detective : { type: Schema.ObjectId, ref: 'Detective'}
});

module.exports = mongoose.model('Case', caseSchema);
