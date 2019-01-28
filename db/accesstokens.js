'use strict';

var jwt = require('jsonwebtoken');

var clients = require('./clients')
const { pool, sql } = require('../sqldb')

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
    
    var utoken = jwt.decode(token)
    console.log(utoken)
    if(utoken.aud != null){
        console.log('Query db for token secret')
        clients.findByClientId(utoken.aud, (err, client) =>{
            if(!err){
                jwt.verify(token, client.tokenSecret, function (err, decoded) {
                    if (err) {
                        console.log('db/accesstoken.get: verify failed! ', client.tokenSecret)
                        return done(null, false);
                    } else {
                        console.log('db/accesstoken.get: verify success!')
                        done(null, {
                            clientId: decoded.aud,
                            userId: decoded.sub,
                            scope: decoded.scope
                        });
                    }
                    
                });
            } else {
                console.log(err)
            }
        })
                
    }
};
