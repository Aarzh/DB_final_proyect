'use strict'

var express = require ('express');
var caseController = require('../controllers/case.js');
var md_Auth = require('../middlewares/authenticated.js')
var api = express.Router();
var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir : './uploads/cases'});

api.get('/case/:id', md_Auth.ensureAuth, caseController.getCase);
api.post('/case', md_Auth.ensureAuth, caseController.saveCase);
api.get('/cases/:Detective?', md_Auth.ensureAuth, caseController.getCases);
api.post('/updateCase/:id', md_Auth.ensureAuth, caseController.updateCase);
api.delete('/deleteCase/:id', md_Auth.ensureAuth, caseController.deleteCase);

module.exports = api;
