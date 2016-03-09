var db = require('../ops/db'),
    co = require('co');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;

module.exports = {

  getToken: function(req, res, next) {
      var encoded = req.headers.authorization.replace('Basic ', '').replace('basic ', '');
      var decoded = new Buffer(encoded, 'base64').toString('utf8').split(':');
      var username = decoded[0], pswd = decoded[1];
      console.log(username, pswd);

      // Lookup account in DB
      //
      //
      //
      //
      if(1==1){
          var token = jwt.getToken(username);
          console.log(token);
          res.send(200, {_id: "89asjasdujsd9ud9as9asdu", email:username, jwt:token});
          return next();
      }
      else{
          // NEED TO CHECK THE DATABASE
          res.send(401, {messaeg:'Not authorized'});
      }
  },


  create: function(req, res, next) {
    console.log(req.params)
    res.send(500, "TMP");
    return next;
        co(function*() {
            if(aid != null){
                var col = db.conn.collection('account');
                var docs = yield col.insertOne( {_id:ObjectID(id)}, projection ).toArray();
                assert.ok((docs.length < 2), 'single record find returned more than one record');
                assert.ok((docs.length == 1), 'there is no mp3 for the id passed');
                res.send(200, docs[0]);
                return next();
            }
        }).catch(function(err) {
            res.send(500, err);
            return next();
        });

  },


  update: function(req, res, next) {


  }



};
