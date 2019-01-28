'use strict';
const { pool, sql } = require('../sqldb')

// var clients = [
//     {
//         clientId: 'client1',
//         clientSecret: 'secret1',
//         name: 'Client 1',
//         trusted: true,
//         tokenSecret: 'SuperSecret123'

//     }, {
//         clientId: 'oauth-consumer-example',
//         clientSecret: 'secret2',
//         name: 'OAuth Consumer Example Client',
//         //redirectURI: 'http://localhost:3002/auth/example/callback',
//         redirectURI: 'http://localhost:4200/index.html',
//         trusted: true,
//         tokenSecret: 'SuperSecret123'
//     }, {
//         clientId: 'google-playground',
//         clientSecret: 'foo',
//         name: 'Google OAuth 2.0 Playground',
//         redirectURI: 'https://developers.google.com/oauthplayground/',
//         trusted: true
//     }
// ];

exports.findByClientId = function (clientId, done = () => {}) {
    return new Promise((resolve, reject) => {
        console.log(clientId)
        pool.then((con) => {
            con.request()
                .input('client_id', sql.VarChar(100), clientId)
                .execute('clientsById', (err, result) => {
                    if(!err){
                        resolve(result.recordset[0])
                        return done(null, result.recordset[0]);
                    } else {
                        console.log(err)
                        return done(null, null);
                    }
                    
            })
            
        }).catch(err => {
            console.log(err)
            reject(err)
            return done(null, null);
        })
    })


    
    
};
