'use strict';

const publicIp = require('public-ip');
const compose = require('compose-middleware').compose;

var IP_VERSION;

function ip(version) {
  IP_VERSION = version || 'v4';
  return (req, res, next) => {
    publicIp[IP_VERSION.toLowerCase()]()
    .then((ip) => {
      res.locals.ip = ip;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
  };
}

function isSameDeviceOrRegion(msg) {
  var err = new Error(msg || 'Seems like you are accessing our services from a different device/region. Please login to continue.');
  err.status = 401;
  return (req, res, next) => {
    if(!req.user) {
      err.message = 'req.user not found';
      return next(err);
    } else if(!req.user.ip) {
      err.message = 'req.user.ip not found';
      return next(err);
    } else if(req.user.ip === res.locals.ip) {
      return next();
    } else {
      return next(err);
    }
  };
}

function auth(msg) {
  return compose([ip(IP_VERSION), isSameDeviceOrRegion(msg)]);
}

module.exports = {ip, auth};