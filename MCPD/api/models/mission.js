'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var missionSchema = Schema({
    number : String,
    alias : String,
    loc : String,
    fecha : String,
    state : String,
    file : String,
    Case : { type : Schema.ObjectId, ref: 'Case'}
});

module.exports = mongoose.model('Mission', missionSchema);
