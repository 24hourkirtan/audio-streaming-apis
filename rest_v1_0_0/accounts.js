var db = require('../ops/db'),
    co = require('co');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;

module.exports = {

  /*
  Use utf8

  new Buffer("Hello World").toString('base64')
  SGVsbG8gV29ybGQ=
  new Buffer("SGVsbG8gV29ybGQ=", 'base64').toString('ascii')
  new Buffer("SGVsbG8gV29ybGQ=", 'base64').toString('utf8')
  Hello World

  'ascii' - for 7 bit ASCII data only. This encoding method is very fast, and will strip the high bit if set.
  'utf8' - Multi byte encoded Unicode characters. Many web pages and other document formats use UTF-8.
  */


  getToken: function(req, res, next) {
      //console.log(req.headers.authorization)

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
          console.log('\nERROR:', err);
          res.send(500, err);
          return next();
      });

  },


  create: function(req, res, next) {
        console.log('create ACCOUNT:', req.params)
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
                console.log(doc)
                var token = jwt.getToken(doc.ops[0]._id, doc.ops[0].type);
                doc.ops[0].jwt = token;
                res.send(200, doc.ops[0]);
                return next();
            }
        }).catch(function(err) {
            console.log('\nERROR:', err);
            res.send(500, err);
            return next();
        });
  },


  update: function(req, res, next) {


  }



};



function validateCreateData(account){
    if(!account.email || !account.pswd) return false;
    else if( account.pswd.length < 6) return false;
    else if( account.email.indexOf('@') == -1) return false;
    return true;
}
