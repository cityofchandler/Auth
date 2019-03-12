'use strict';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var ResourceOwnerPasswordStrategy = require('passport-oauth2-resource-owner-password').Strategy;
var CustomOauth2Client = require('passport-custom').Strategy;
var db = require('../db');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.users.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local', new LocalStrategy(
    function (username, password, done) {
        db.users.checkCredentials(username, password, function (err, res) {
            if (err) return done(err);
            if (!res) return done(null, false);
            return db.users.findByUsername(username, done);
        });
    }
));

passport.use('basic', new BasicStrategy(
    function (clientId, clientSecret, done) {
        db.clients.findByClientId(clientId, function (err, client) {
            if (err) {
                console.log('basic error'); 
                return done(err);
            }
            if (!client) {
                console.log('basic error'); 
                return done(null, false);
            }
            if (client.clientSecret === clientSecret) {
                console.log('basic Done'); 
                return done(null, client);
            }
            console.log('basic Done'); 
            done(null, false);
        });
    }
));

passport.use('oauth2-client-password', new ClientPasswordStrategy(
    function (clientId, clientSecret, done) {
        db.clients.findByClientId(clientId, function (err, client) {
            if (err) {
                return done(err);
            }
            if (!client) {
                return done(null, false);
            }
            // if (client.clientSecret === clientSecret) {
            //     return done(null, client);
            // }
            done(null, client);
        });
    }
));

passport.use('custom-oauth2-client', new CustomOauth2Client(
    function(req, done){
        console.log('custom-oauth2-client Strategy')
        console.log(req.body.client_id + ' ' + req.query.client_id)
        var client_id = req.body.client_id || req.query.client_id
        if(client_id){
            db.clients.findByClientId(client_id, function (err, client) {
                if (err) {
                    console.log("error")
                    return done(err);
                }
                if (!client) {
                    return done(null, false);
                }
                // if (client.clientSecret === clientSecret) {
                //     return done(null, client);
                // }
                done(null, client);
            });
        } else {
            done(null, false)
        }
        
    }
))

passport.use('oauth2-resource-owner-password', new ResourceOwnerPasswordStrategy(
    function (clientId, clientSecret, username, password, done) {
        db.clients.findByClientId(clientId, function (err, client) {
            if (err) return done(err);
            if (!client) return done(null, false);
            db.users.checkCredentials(username, password, function (err2, user) {
                if (err2) return done(err2);
                if (!user) return done(null, false);
                done(null, client, user);
            });
        });
    }
));

passport.use('accessToken', new BearerStrategy(
    function (accessToken, done) {
        db.accessTokens.get(accessToken, function (err, token) {
            if (err) return done(err);
            if (!token) return done(null, false);
            done(null, {id: token.userId}, {scope: token.scope || '*'});
        });
    }
));
