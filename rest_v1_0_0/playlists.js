var db = require('../ops/db'),
    co = require('co');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;

module.exports = {

  getAll: function(req, res, next) {
      console.log('------------------ /playlists.getAll: ', req.params);
        var aid = jwt.verifyToken(req);
        console.log(aid);

        var playlist = {};
        playlist._id = "23423r23f2-232f-2f2f2ff";
        playlist.owner_id = "123412e123e-2d223d32-d23d2f23f";
        playlist.name = "my_playlist";
        playlist.mp3 = [{"_id": "1212312-d123d23d23-d3d233"}, {"_id": "7897789-34f234t23t-r34r3434v34"}];

        res.send(200, [playlist]);
        return next();
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

              res.send(200, doc.ops[0]);
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
              assert.ok((docs.value.name), 'the playlist was not updated');
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
