'use strict';

var passport = require('passport');
var jwt = require('jsonwebtoken');

const { pool, sql } = require('../../sqldb')

function IdTokenStrategy(options, verify) {
    if (typeof options === 'function') {
        verify = options;
        options = {};
    }

    if (!verify) throw new Error('IdTokenStrategy requires a verify function');

    this._passReqToCallback = options.passReqToCallback;

    this._secret = options.secret;
    this._algorithm = options.algorithm || 'RS256';

    passport.Strategy.call(this);
    this.name = 'id-token';
    this._verify = verify;
}

IdTokenStrategy.prototype.authenticate = function (req, options) {
    options = options || {};
    var self = this;

    if (req.query && req.query.error) return this.fail();

    var idToken;
    if (req.body) idToken = req.body.id_token;
    idToken = idToken || req.query.id_token || req.get('id_token');
    if (!idToken) return this.fail();

    this._verifyIdToken(idToken, self._clientID, function (err, parsedIdToken) {
        if (err) return self.fail(err);
        function verified(err2, parsedToken, info) {
            if (err2) return self.error(err2);
            if (!parsedToken) return self.fail(info);
            self.success(parsedToken, info);
        }

        if (self._passReqToCallback) {
            self._verify(req, parsedIdToken, parsedIdToken.sub, verified);
        } else {
            self._verify(parsedIdToken, parsedIdToken.sub, verified);
        }
    });
};

IdTokenStrategy.prototype._verifyIdToken = function (idToken, clientID, done) {

    pool.then((con) => {
        con.request()
            .input('client_id', sql.VarChar(100), clientID)
            .execute('clientsById', (err, result) => {
                if(!err){
                    jwt.verify(idToken, result.recordset[0].tokenSecret, function (err, decoded) {
                        console.log('IdTokenStrategy: token verified')
                        if (err) return done(err);
                        return done(null, decoded);
                    });
                } else {
                    console.log(err)
                    console.log('IdTokenStrategy: token NOT verified')
                    return done(null, null);
                }
                
        })
        
    }).catch(err => {
        console.log(err)
        return done(null, null);
    })

    // jwt.verify(idToken, this._secret, function (err, decoded) {
    //     if (err) return done(err);
    //     // TODO: check clientID ?
    //     return done(null, decoded);
    // });
};

module.exports = IdTokenStrategy;
