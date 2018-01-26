'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar ruta
var user_routes = require('./routes/user');
var detective_routes = require('./routes/detective');
var case_routes = require('./routes/case');
var mission_routes = require('./routes/mission');


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//configurar cabeceras

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//carga de rutas bases
app.use('/api', user_routes);
app.use('/api', detective_routes);
app.use('/api', case_routes);
app.use('/api', mission_routes);

module.exports = app;
