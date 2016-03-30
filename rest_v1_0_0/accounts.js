var db = require('../ops/db'),
    co = require('co');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;
var db = require('../ops/db');

/**
 * Export all functions that manage the database ACCOUNTS collection
 * @type {Object}
 */
module.exports = {

    getToken: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var encoded = req.headers.authorization.replace('Basic ', '').replace('basic ', '');
        var decoded = new Buffer(encoded, 'base64').toString('utf8').split(':');
        var email = decoded[0], pswd = decoded[1];
        //console.log(email, pswd);
        pswd = new Buffer(pswd, 'base64').toString('utf8')
        //console.log(pswd);

        co(function*() {
            var col = db.conn.collection('accounts');
            var docs = yield col.find( {email:email, pswd:pswd}).toArray();

            if(docs.length == 1){
                var token = jwt.getToken(docs[0]._id, docs[0].type);
                //console.log(token);
                res.send(200, {_id: docs[0]._id, email:docs[0].email, jwt:token});
                return next();
            }
            else{
                res.send(401, {message:'Not authorized'});
                return next();
            }
        }).catch(function(err) {
            db.insertLogs('ERROR: (accounts.getToken) '+err);
            res.send(500, err);
            return next();
        });
    },

    get: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var aid = jwt.verifyToken(req, res, next);

        co(function*() {
            if(aid != null){
                var col = db.conn.collection('accounts');
                var doc = yield col.findOne( {_id:ObjectID(aid)});
                assert.ok((doc.email), 'account not found');
                delete doc.pswd;
                res.send(200, doc);
                return next();
            }
        }).catch(function(err) {
            db.insertLogs('ERROR: (accounts.get) '+err);
            res.send(500, err);
            return next();
        });
    },

    create: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var account = req.params;
        // Validate data
        var proceed = true;
        if(!validateCreateData(account)){
            proceed = false;
            res.send(409, {message:'submission data missing or invalid'});
            return next();
        }

        co(function*() {
            if(proceed){
                account.pswd = new Buffer(account.pswd, 'base64').toString('utf8');
                var col = db.conn.collection('accounts');
                var doc = yield col.insertOne(
                      { email: account.email,
                        pswd: account.pswd,
                        type: 'local'
                       }
                );
                assert.ok((doc.insertedCount == 1), 'the account was not created');
                //console.log(doc)
                var token = jwt.getToken(doc.ops[0]._id, doc.ops[0].type);
                doc.ops[0].jwt = token;
                delete doc.ops[0]['pswd'];
                res.send(201, doc.ops[0]);
                return next();
            }
        }).catch(function(err) {
            db.insertLogs('ERROR: (accounts.create) '+err);
            res.send(500, err);
            return next();
        });
    },


    modify: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var aid = jwt.verifyToken(req, res, next);
        var account = req.params;
        // Validate data
        var proceed = true;
        if(account._id && aid != account._id){
          proceed = false;
          res.send(409, {message:'invalid modify attempt'});
          return next();
        }
        if(!validateModifyData(account)){
          proceed = false;
          res.send(409, {message:'submission data missing or invalid'});
          return next();
        }

        co(function*() {
            if(proceed){
                var col = db.conn.collection('accounts');
                var doc = yield col.findOneAndUpdate({_id:ObjectID(aid)},
                      {$set: {email: account.email}},
                      {returnOriginal: false, upsert: false}
                );
                assert.ok((doc.value), 'the account was not modified, was the proper _id passed');
                delete doc.value['pswd'];
                res.send(200, doc.value);
                return next();
            }
        }).catch(function(err) {
            db.insertLogs('ERROR: (accounts.modify) '+err);
            res.send(500, err);
            return next();
        });
    }
};


function validateModifyData(account){
    if(!account.email) return false;
    else if( account.email.indexOf('@') == -1) return false;
    return true;
}

function validateCreateData(account){
    if(!account.email || !account.pswd) return false;
    else if( account.pswd.length < 6) return false;
    else if( account.email.indexOf('@') == -1) return false;
    return true;
}
