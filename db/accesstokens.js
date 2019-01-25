'use strict';

var jwt = require('jsonwebtoken');

var clients = require('./clients')

exports.secret = 'keyboard cat';
exports.algorithm = 'HS256';
exports.ttl = 3600;

exports.create = function (data, done) {
    clients.findByClientId(data.clientId, function(err, client){
        console.log('Client Returned: ', client)
        if(!err){
            var token = jwt.sign({
                aud: data.clientId,
                sub: data.userId,
                scope: data.scope
            }, client.tokenSecret, {
                algorithm: exports.algorithm,
                expiresInSeconds: exports.ttl
            });
            done(null, token);
        } else {
            done(null, null);
        }
    })
        
};

exports.get = function (token, done) {
    jwt.verify(token, exports.secret, function (err, decoded) {
        if (err) return done(null, false);
        done(null, {
            clientId: decoded.aud,
            userId: decoded.sub,
            scope: decoded.scope
        });
    });
};
