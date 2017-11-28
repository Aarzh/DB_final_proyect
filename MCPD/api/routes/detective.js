'use strict'

var express = require('express');
var detectiveController = require('../controllers/detective.js');
var api = express.Router();
var md_Auth = require('../middlewares/authenticated.js');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir : './uploads/detectives'});

api.get('/detective/:id', md_Auth.ensureAuth, detectiveController.getDetective);
api.post('/detective', md_Auth.ensureAuth, detectiveController.saveDetective);
api.get('/detectives/:page?', md_Auth.ensureAuth, detectiveController.getDetectives);
api.put('/detective/:id', md_Auth.ensureAuth, detectiveController.updateDetective);
api.delete('/detective/:id', md_Auth.ensureAuth, detectiveController.deleteDetective);
api.post('/uploadImageDetective/:id', [md_Auth.ensureAuth, mdUpload], detectiveController.uploadImage);
api.get('/getImageDetective/:imageFile', detectiveController.getImageFile);

module.exports = api;
