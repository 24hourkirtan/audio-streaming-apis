var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');




module.exports = {

    init: function(directoryPath) {
      var url = 'mongodb://192.168.2.104:27017/kirtan';
          // Use connect method to connect to the Server
          MongoClient.connect(url, function(err, db) {
          assert.equal(null, err);
          console.log("Connected correctly to server");

          db.close();
      });

    }
};
