var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var database;
var config = require("../config.json") [process.env.NODE_ENV];


module.exports = {

    init: function(directoryPath) {
        console.log('>>>  db.init: process.env.NODE_ENV: ', process.env.NODE_ENV);
        var url = config.db_kirtan.url;
        var maxPoolSize = config.db_kirtan.maxPoolSize;
        // Use connect method to connect to the Server
        MongoClient.connect(url+'?maxPoolSize='+maxPoolSize, function(err, db) {
            assert.equal(null, err);
            console.log(">>>  Connected to:", url);
            database = db;
            database.on('close', dbCloseEvent );
            module.exports.conn = database;
            insertLogs();
        });

        module.exports.close = function(){
            console.log(">>>  Closing database");
            database.close();
        };

        module.exports.sec = ")]}',\n"; //")]}',\n";
    }
};

function dbCloseEvent(){
    console.log(">>>  Event fired DB has been shut down")
}



var insertLogs = function() {
    // Get the documents collection
    var collection = database.collection('logs');
    var dttm = new Date();
    // Insert some documents
    collection.insertMany([
      {dttm : dttm, msg:'started database'}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      //assert.equal(3, result.ops.length);
      console.log(">>>  Inserted startup log entry: ", dttm);
      //callback(result);
    });
}
