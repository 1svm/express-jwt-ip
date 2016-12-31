# express-jwt-ip

Middleware that validates ip address in JsonWebTokens.

This module lets you authenticate HTTP requests using JWT tokens statelessly
based on user's IP address assigned to JWT payload during login process in your
Node.js applications.

## Install

    $ npm install --save express-jwt-ip

## Usage

The IPv4/IPv6 based JWT authentication middleware authenticates callers statelessly
using a JWT which includes 'ip' as its claims. This 'ip' is set during login process
by manually adding 'ip' field as res.locals.ip in JWT payload followed by serving
the token to the client.

For example,

```javascript
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
```


You can specify the version of IP (default: IPv4) and custom message:

```javascript

app.post('/login', expressJwtIp.ip('v6'), function(req, res) {
  var token = jwt.sign({_id: '1', ip: res.locals.ip}, 'MYCOOLSECRET');
  res.status(200).json({token: token});
});


app.get('/me', expressJwt({secret: 'MYCOOLSECRET'}), expressJwtIp.auth('v6', 'YOUR CUSTOME MSG'), function(req, res) {
  res.status(200).json({name: 'John Doe'});
});
```

## Repository
Check out the [repository](https://github.com/visionexpress)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker.

## Author

[Shivam Malhotra](https://github.com/visionexpress)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
