'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Detective = require ('../models/detective');
var Case = require ('../models/case');
var Mission = require ('../models/mission');

function getDetective (req, res){
    var detectiveId = req.params.id;
    Detective.findById(detectiveId, (err, detective) => {
        if (err) {
            res.status(500).send({message : "error en la peticion"});
        }
        else {
            if (!detective) {
                res.status(404).send({message : "No existe el artista"});
            }
            else {
                res.status(200).send({detective});
            }
        }
    });
}

function saveDetective(req, res){
    var detective = new Detective();
    var params = req.body;
    detective.name = params.name;
    detective.surname = params.surname;
    detective.rank = params.rank;
    detective.description = params.description;
    detective.year = params.year;
    detective.image = 'null';

    detective.save((err, detectiveStored) => {
        if (err) {
            res.status(500).send({message : "Error guardando el detective "});
        }else{
            if (!detectiveStored) {
                res.status(404).send({message : "Error al guardarlo"});
            }
            else {
                res.status(500).send({detective : detectiveStored});
            }
        }
    });
}

function getDetectives(req, res){
    if (req.params.page) {
        var page = req.params.page;
    }else {
        var page = 1;
    }
    var itemsPerPage = 8;

    Detective.find().sort('rank').paginate(page, itemsPerPage, function(err, detectives, total){
      if (err) {
        res.status(500).send({message : "Error en la peticion "});
      }
      else {
        if (!detectives) {
          res.status(404).send({message : "No hay artistas"});
        }else{
            return res.status(200).send({
                totalItems : total,
                detectives : detectives
            })
        }
      }

    });
}

function updateDetective(req, res){
    var detectiveId = req.params.id;
    var update = req.body;

    Detective.findByIdAndUpdate(detectiveId, update, (err, detectiveUpdated) => {
        if (err) {
          res.status(500).send({message : 'Error al actualizar '});
        }else {
          if (!detectiveUpdated) {
            res.status(404).send({message : "No se ha podido actualizar el usuario "});
          }else {
            res.status(200).send({detective : detectiveUpdated});
          }
        }
    });
}

function deleteDetective(req, res){
    var detectiveId = req.params.id;

    Detective.findByIdAndRemove(detectiveId, (err, detectiveDeleted) => {
        if (err) {
          res.status(500).send({message : 'Error al eliminar '});
        }
        else {
          if(!detectiveDeleted){
            res.status(404).send({message : "No se ha podido eliminar al usuario "});
          }
          else {
            Case.find({Detective : deleteDetective._id}).remove((err, caseRemoved) => {
              if (err) {
                res.status(500).send({message : 'Error al eliminar '});
              }else {
                  if (!caseRemoved) {
                      res.status(404).send({message : "No se ha podido eliminar al detective "});
                  }else {
                      Mission.find({Case : caseRemoved._id}).remove((err, missionRemoved) => {
                          if (err) {
                            res.status(500).send({message : 'Error al eliminar mision'});
                          }else {
                              if (!missionRemoved) {
                                res.status(404).send({message : "No se ha podido eliminar la mision "});
                              }else {
                                  res.status(200).send({Detective : detectiveDeleted});
                              }
                          }
                      });
                  }
              }
            });
          }
        }
    });
}

function uploadImage(req, res)
{
    var detectiveId = req.params.id;
    var fileName = 'No subido';

    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\/');
        var fileName = fileSplit[2];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif') {
            Detective.findByIdAndUpdate(detectiveId, {image: fileName}, (err, detectiveUpdated) => {
              if (!detectiveUpdated) {
                  res.status(404).send({message : "No se ha podido cambiar la imagen "});
              }else {
                  res.status(200).send({ Detective : detectiveUpdated});
              }
            });
        }else {
            res.status(500).send({message : "Formato de imagen invalido"});
        }
    console.log(extSplit);
    }else {
      res.status(200).send({message : 'No se ha subido la imagen '});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/detectives/'+imageFile;

    fs.exists(pathFile, function(exists){
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        }else {
            res.status(404).send({message : 'Su Imagen no existe'});
        }
    });
}


module.exports = {
    getDetective,
    saveDetective,
    getDetectives,
    updateDetective,
    deleteDetective,
    uploadImage,
    getImageFile
};
