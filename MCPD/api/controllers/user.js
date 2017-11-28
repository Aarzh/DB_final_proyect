'use strict'

var bcrypt = require("bcrypt-nodejs");
var User = require("../models/user.js");
var jwt = require("../services/jwt.js");
var fs = require("fs");
var path = require("path");

function pruebas(req, res)
{
    res.status(200).send({
        message : "Probando una accion del controlador "
    });
}
function saveUser(req, res)
{
    var user = new User();
    var params = req.body;

    user.name=params.name;
    user.surname=params.surname;
    user.email=params.email;
    user.role='ROLE_USER';
    user.image='null';

    if (params.password){
            bcrypt.hash(params.password, null, null, function(err, hash){
                user.password = hash;
                if (user.name != null && user.surname != null && user.email != null){
                    user.save((err, userStored) => {
                        if (err){
                            res.status(500).send({message: "Error al guardar usuario"});
                        }
                        else{
                            if (!userStored){
                                res.status(404).send({message: "No se ha registrado el usuario"});
                            }
                            else{
                                res.status(200).send({message: "Usuario guardado", user: userStored});
                            }
                        }
                    });
                }
                else{
                    res.status(200).send({message:"Rellene todos los campos"});
                }
            });
        }
        else{
            res.status(200).send({message:"Introduce la contraseña"});
        }
}

function loginUser(req, res){
  var params = req.body;

  var email = params.email;
  var password = params.password;

  User.findOne({email : email.toLowerCase()}, (err, user) => {
    if (err) {
      res.status(500).send({message : "Error en la peticion"});
    }
    else {
      if (!user) {
        res.status(404).send({message : "Usuario no existe"})
      }
      else {
        bcrypt.compare(password, user.password, function(err, check){
          if (check) {
            //devolver datos del user loggeado
            if (params.gethash) {
              //return token jwt
              res.status(200).send({token : jwt.createToken(user)});
            }
            else {
              res.status(200).send({user});
            }
          }
          else {
            res.status(404).send({message : "Contrasena incorrecta "});
          }
        });
      }
    }
  });
}

function updateUser(req, res)
{
    var userId = req.params.id;
    var update = req.body;

    if(userId != req.user.sub){
        return res.status(500).send({message : 'No tienes permisos'});
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
      if (err) {
          res.status(500).send({message : 'Error al actualizar '});
      }else{
        if (!userUpdated) {
          res.status(404).send({message : "No se ha podido actualizar el usuario "});
        }else{
          res.status(200).send({user : userUpdated});
        }
      }
    });
}

function uploadImage(req, res)
{
    var userId = req.params.id;
    var fileName = 'No subido';

    if(req.files){
      var filePath = req.files.image.path;
      var fileSplit = filePath.split('\/');
      var fileName = fileSplit[2];
      var extSplit = fileName.split('\.');
      var fileExt = extSplit[1];

      if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif') {
        User.findByIdAndUpdate(userId, {image: fileName}, (err, userUpdated) => {
          if (!userUpdated) {
            res.status(404).send({message : "No se ha podido actualizar el usuario "});
          }else{
            res.status(200).send({image : fileName, user : userUpdated});
          }
        });
      }else {
        res.status(500).send({message : "Formato de imagen inválido"});
      }

      console.log(extSplit);
    }else {
      res.status(200).send({message : 'No se ha subido la imagen '});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/users/'+imageFile;

    fs.exists(pathFile, function(exists){
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        }else {
            res.status(404).send({message : 'Su Imagen no existe'});
        }
    });
}


module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};
