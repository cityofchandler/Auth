'use strict';

var randomstring = require('randomstring');

exports.ttl = 10;

var memory = {};

exports.create = function (data, done) {
    var token = randomstring.generate(20);
    memory[token] = {
        expires: Date.now() + exports.ttl * 1000,
        payload: data
    };
    done(null, token);
    console.log(memory)
};

exports.get = function (token, done) {
    console.log('Looking for access token: ' + token)
    console.log('In DB: ', memory)
    var value = memory[token];

    // not found
    if (!value) {
        console.log('Memory: ' + value)
        return done(null, false);
    }

    // expired
    if (value.expires <= Date.now()) {
        delete memory[token];
        return done(null, false);
    }

    return done(null, value.payload);
};

exports.remove = function (token, done) {
    delete memory[token];
    return done(null);
};
