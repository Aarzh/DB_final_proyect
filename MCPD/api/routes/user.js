'use strict'

var express = require ('express');
var UserController = require('../controllers/user.js');
var md_Auth = require('../middlewares/authenticated.js')
var api = express.Router();
var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir : './uploads/users'});

api.get('/probandoControlador',md_Auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/updateUser/:id', md_Auth.ensureAuth, UserController.updateUser);
api.post('/uploadImageUser/:id', [md_Auth.ensureAuth, mdUpload], UserController.uploadImage);
api.get('/getImageUser/:imageFile', UserController.getImageFile);

module.exports = api;
