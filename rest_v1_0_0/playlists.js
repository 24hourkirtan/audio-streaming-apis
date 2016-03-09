var db = require('../ops/db'),
    co = require('co');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;

module.exports = {

  getAll: function(req, res, next) {

        console.log('playlists-v1')

        // Kicks out an error that Restify will handle
        //throw new Error('error inside Restify route scope using /playylists')

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
      console.log('\n------------------ CREATE:', req.params);
      var item = req.params;
      var aid = jwt.verifyToken(req, res, next);

      co(function*() {
          if(aid != null){
              var col = db.conn.collection('playlists');
              var doc = yield col.insertOne(
                    { aid: ObjectID(aid),
                      name: item.name,
                      mp3s:item.mp3s,
                      trash: Array(2000).join("-")
                     }
              );
              assert.ok((doc.insertedCount == 1), 'the playlist was not created');

              // Remove trash key used for padding
              var result2 = yield col.findOneAndUpdate({_id:doc.ops[0]._id},
                    {$unset: {trash:""}
                    },
                    {returnOriginal: false, upsert: false}
              );
              assert.ok((result2.lastErrorObject.n == 1), 'the playlist was created but the playlist padding field was not removed');
              res.send(200, result2.value);
              return next();
          }
      }).catch(function(err) {
        console.log('\nEROR:', err);
          res.send(500, err);
          return next();
      });
  },

  modify: function(req, res, next) {
      console.log(req.params)
      var item = req.params;
      var aid = jwt.verifyToken(req, res, next);
      co(function*() {
          if(aid != null){
              var col = db.conn.collection('playlists');
              var docs = yield col.findOneAndUpdate({_id:ObjectID(item._id)},
                    {$set: {name: item.name,
                            aid: ObjectID(aid),
                            mp3s:[]}
                    },
                    {returnOriginal: false, upsert: false}
              );
              console.log('UPDATE: ', docs)
              assert.ok((docs.updatedCount == 1), 'the playlist was not updated');
              res.send(200, docs);
              return next();
          }
      }).catch(function(err) {
          res.send(500, err);
          return next();
      });
  },

  delete: function(req, res, next) {
      console.log(req.params)
      var aid = jwt.verifyToken(req, res, next);
      co(function*() {
          if(aid != null){
              var col = db.conn.collection('playlists');
              var docs = yield col.deleteOne( {_id:ObjectID(req.params._id)} );
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
