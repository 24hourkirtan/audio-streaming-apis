var db = require('../ops/db'),
    co = require('co');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;

module.exports = {

  getAll: function(req, res, next) {
      console.log('------------------ /playlists.getAll: ', req.params);
        var aid = jwt.verifyToken(req);
        co(function*() {
            var col = db.conn.collection('playlists');
            var docs = yield col.find({aid:ObjectID(aid)}).sort({name:1}).toArray();
            res.send(200, docs);
            return next();
        }).catch(function(err) {
            console.log('\nERROR:', err);
            res.send(500, err);
            return next();
        });
  },

  get: function(req, res, next) {
      var aid = jwt.verifyToken(req, res, next);
      var p = req.params;
      co(function*() {
          var col = db.conn.collection('playlists');
          var doc = yield col.findOne( {_id:ObjectID(p._id), aid:ObjectID(aid)});
          console.log(doc)
          assert.ok((doc.aid), 'playlist not found');
          res.send(200, doc);
          return next();
      }).catch(function(err) {
          console.log('\nERROR:', err);
          res.send(500, err);
          return next();
      });
  },

  create: function(req, res, next) {
      var item = req.params;
      var aid = jwt.verifyToken(req, res, next);
      console.log('------------------ /playlists.create: ', req.params);
      co(function*() {
          if(aid != null){
              var col = db.conn.collection('playlists');
              var doc = yield col.insertOne(
                    { aid: ObjectID(aid),
                      name: item.name,
                      mp3s:item.mp3s
                     }
              );
              assert.ok((doc.insertedCount == 1), 'the playlist was not created');

              res.send(201, doc.ops[0]);
              return next();
          }
      }).catch(function(err) {
        console.log('\nEROR:', err);
          res.send(500, err);
          return next();
      });
  },

  modify: function(req, res, next) {
      var item = req.params;
      var aid = jwt.verifyToken(req, res, next);
      console.log('------------------ /playlists.modify:\n', req.params);
      co(function*() {
          if(aid != null){
              var col = db.conn.collection('playlists');
              var docs = yield col.findOneAndUpdate({_id:ObjectID(item._id), aid:ObjectID(aid)},
                    {$set: {name: item.name,
                            mp3s:[]}
                    },
                    {returnOriginal: false, upsert: false}
              );
              console.log('MODIFY: ', docs.value.name)
              assert.ok((docs.value.name), 'the playlist was not modified');
              res.send(200, docs);
              return next();
          }
      }).catch(function(err) {
          res.send(500, err);
          return next();
      });
  },

  delete: function(req, res, next) {
      var aid = jwt.verifyToken(req, res, next);
      console.log('------------------ /playlists.delete:', req.params);
      co(function*() {
          if(aid != null){
              var col = db.conn.collection('playlists');
              var docs = yield col.deleteOne( {_id:ObjectID(req.params._id), aid:ObjectID(aid)} );
              console.log('DELETE: ', docs.deletedCount)
              assert.ok((docs.deletedCount == 1), 'the playlist was not deleted');
              res.send(200, docs);
              return next();
          }
      }).catch(function(err) {
          res.send(500, err);
          return next();
      });
  }


};
