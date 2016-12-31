'use strict';

var expressJwtIp = require('./lib/express-jwt-ip');
var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var app = express();

app.post('/login', expressJwtIp.ip(), function(req, res) {
  var token = jwt.sign({_id: '1', ip: res.locals.ip}, 'MYCOOLSECRET');
  res.status(200).json({token: token});
});

app.get('/me', expressJwt({secret: 'MYCOOLSECRET'}), expressJwtIp.auth(), function(req, res) {
  res.status(200).json({name: 'John Doe'});
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

app.listen(7889);