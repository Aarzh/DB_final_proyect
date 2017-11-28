'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Detective = require ('../models/detective');
var Case = require ('../models/case');
var Mission = require ('../models/mission');

function getCase (req, res){
    var caseId = req.params.id;
    Case.findById(caseId).populate({path: 'Detective'}).exec((err, caso) => {
        if (err) {
            res.status(500).send({message : 'Error en la peticion'});
        }else {
            if (!caso) {
                res.status(404).send({message : 'Error al cargar el caso'});
            }else {
                res.status(200).send({caso});
            }
        }
    })
}

function saveCase (req, res){
    var caso = new Case();
    var params = req.body;

    caso.title = params.title;
    caso.description = params.description;
    caso.year = params.year;
    caso.loc = params.loc;
    caso.state = params.state;
    caso.Detective = params.Detective;

    caso.save((err, caseStored) => {
        if (err) {
          res.status(500).send({message : "Error en la peticion"});
        }else {
          if (!caseStored) {
              res.status(404).send({message : "Caso no guardado"});
          }else {
              res.status(200).send({caso: caseStored});
          }
        }
    })
}

function getCases(req, res)
{
    var detectiveId=req.params.detective;

    if (!detectiveId) {

      var find = Case.find({}).sort('title');

    }else {
      var find = Case.find({detective : detectiveId}).sort('year');
    }

    find.populate({path: 'detective'}).exec((err, casos) => {

      if(err){
          res.status(500).send({message : "Ha ocurrido un error"});
      }else {
          if (!casos) {
              res.status(404).send({message : "No hay casos asignados"});
          }else {
              res.status(200).send({casos});
          }
      }

    });
}

function updateCase(req, res){
    var caseId = req.params.id;
    var update = req.body;

    Case.findByIdAndUpdate(caseId, update, (err, caseUpdated) => {
        if (err) {
          res.status(500).send({message : "Ha ocurrido un error"});
        }else {
            if (!caseUpdated) {
                res.status(404).send({message : "No se ha actualizado el caso"});
            }else {
                res.status(200).send({caso : caseUpdated});
            }
        }
    });
}

function deleteCase(req, res){
    var caseId = req.params.id;
    Case.findByIdAndRemove(caseId, (err, caseRemoved) => {
      if (err) {
        res.status(500).send({message : 'Error al eliminar '});
      }else {
          if (!caseRemoved) {
              res.status(404).send({message : "No se ha podido eliminar el caso "});
          }else {
              Mission.find({Case : caseRemoved._id}).remove((err, missionRemoved) => {
                  if (err) {
                    res.status(500).send({message : 'Error al eliminar el caso'});
                  }else {
                      if (!missionRemoved) {
                        res.status(404).send({message : "No se ha podido eliminar la mision "});
                      }else {
                          res.status(200).send({caso : caseRemoved});
                      }
                  }
              });
          }
      }
    });
}

module.exports = {
  getCase,
  saveCase,
  getCases,
  updateCase,
  deleteCase
}
