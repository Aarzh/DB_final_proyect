'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Detective = require ('../models/detective');
var Case = require ('../models/case');
var Mission = require ('../models/mission');

function getMission(req, res){
    var missionId = req.params.id;

    Mission.findById(missionId).populate({path : 'Case'}).exec((err, mission) => {
        if (err) {
          res.status(500).send({message : "Ocurrio un error"});
        }else {
            if (!mission) {
              res.status(404).send({message : "No existe esa mision"});
            }else {
              res.status(200).send({mission});
            }
        }
    });
}

function saveMission(req, res){
    var mission = new Mission();
    var params = req.body;
    mission.number = params.number;
    mission.alias = params.alias;
    mission.loc = params.loc;
    mission.fecha = params.fecha;
    mission.state = params.state;
    mission.file = null;
    mission.Case = params.Case;

    mission.save((err, missionStored) => {
        if (err) {
            res.status(500).send({message : "Ocurrio un error"});
        }else {
            if (!missionStored) {
                res.status(404).send({message : "No se pudo guardar la mision"});
            }else {
                res.status(200).send({mission : missionStored});
            }
        }
    });
}

function getMissions(req, res){
    var caseId = req.params.Case;

    if (!caseId)
    {
      var find = Mission.find({}).sort('number');
    }else {
      var find = Mission.find({Case : caseId}).sort('number');
    }
    find.populate({path: 'Case', populate : {path: 'Detective', model : 'Detective'}}).exec((err, missions) => {
      if(err){
          res.status(500).send({message : "Ha ocurrido un error"});
      }else {
          if (!missions) {
              res.status(404).send({message : "No hay casos asignados"});
          }else {
              res.status(200).send({missions});
          }
      }
    });
}

function updateMission(req, res){
    var missionId = req.params.id;
    var update = req.body;

    Mission.findByIdAndUpdate(missionId, update, (err, missionUpdate) => {
        if (err) {
            res.status(500).send({message : 'No se pudo actualizar'});
        }else{
            if (!missionUpdate) {
                res.status(404).send({message : 'No se encuentra esa mision'});
            }else {
                res.status(200).send({Mission : missionUpdate});
            }
        }
    });
}

function deleteMission(req, res){
    var missionId = req.params.id;

    Mission.findByIdAndRemove(missionId, (err, missionRemoved) => {
        if (err) {
            res.status(500).send({message : 'Error al eliminar'});
        }else {
            if (!missionRemoved) {
                res.status(404).send({message : 'No se encuentra la mision'});
            }else{
                res.status(200).send({Mission : missionRemoved});
            }
        }
    });
}


function uploadFile(req, res)
{
    var missionId = req.params.id;
    var fileName = 'No subido';

    if (req.files) {
        var filePath = req.files.file.path;
        var fileSplit = filePath.split('\/');
        var fileName = fileSplit[2];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if (fileExt == 'pdf' || fileExt == 'txt' || fileExt == 'docx') {
            Mission.findByIdAndUpdate(missionId, {file : fileName}, (err, missionUpdated) => {
              if (!missionUpdated) {
                  res.status(404).send({message : "No se ha podido cambiar el documento "});
              }else {
                  res.status(200).send({ Mission : missionUpdated});
              }
            });
        }else {
            res.status(500).send({message : "Formato de documento invalido"});
        }
    console.log(extSplit);
    }else {
      res.status(200).send({message : 'No se ha subido el documento '});
    }
}

function getDocFile(req, res){
    var docFile = req.params.missionFile;
    var pathFile = './uploads/missions/'+docFile;

    fs.exists(pathFile, function(exists){
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        }else {
            res.status(404).send({message : 'Su archivo no existe'});
        }
    });
}


module.exports = {
  getMission,
  saveMission,
  getMissions,
  updateMission,
  deleteMission,
  uploadFile,
  getDocFile
}
