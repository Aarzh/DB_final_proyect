'use strict'

var express = require ('express');
var missionController = require('../controllers/mission.js');
var md_Auth = require('../middlewares/authenticated.js')
var api = express.Router();
var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir : './uploads/missions'});

api.get('/mission/:id', md_Auth.ensureAuth, missionController.getMission);
api.post('/mission', md_Auth.ensureAuth, missionController.saveMission);
api.get('/missions/:Case?', md_Auth.ensureAuth, missionController.getMissions);
api.put('/mission/:id', md_Auth.ensureAuth, missionController.updateMission);
api.delete('/mission/:id', md_Auth.ensureAuth, missionController.deleteMission);
api.post('/uploadDocMission/:id', [md_Auth.ensureAuth, mdUpload], missionController.uploadFile);
api.get('/getDocMission/:missionFile', md_Auth.ensureAuth, missionController.getDocFile);


module.exports = api;
