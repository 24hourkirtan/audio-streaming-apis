var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var database;
var config = require("../config.json") [process.env.NODE_ENV];

/**
 * Export all functions that manage db connections and logs
 * @type {Object}
 */
module.exports = {

    /**
     * Inits the database connection pool
     * @return {none}
     */
    init: function() {
        /**
         * Calls internal function to creates a log entry in the LOGS collection.
         * @param  {string}   message message to log
         * @return {none}
         */
        module.exports.insertLogs = function(message) {
            insertLogs(message);
        }

        console.log('>>>  db.init: process.env.NODE_ENV: ', process.env.NODE_ENV);
        var url = config.db_kirtan.url;
        var maxPoolSize = config.db_kirtan.maxPoolSize;
        MongoClient.connect(url+'?maxPoolSize='+maxPoolSize, function(err, db) {
            assert.equal(null, err);
            console.log(">>>  Connected to:", url);
            database = db;
            database.on('close', dbCloseEvent );
            module.exports.conn = database;
            insertLogs('Database started (db.js)');
        });

        /**
         * Closes the connection pool
         * @return {none}
         */
        module.exports.close = function(){
            console.log(">>>  Closing database");
            database.close();
        };
    }
};

/**
 * Event fired when the conneciton pool closes
 * @return {none}
 */
function dbCloseEvent(){
    console.log(">>>  Event fired DB has been shut down")
}

/**
 * Creates a log entry in the LOGS collection. LOGS is a TTL collection.
 * @param  {string}   message message to log
 * @return {none}
 */
function insertLogs(message) {
    var collection = database.collection('logs');
    var dttm = new Date();
    collection.insertOne({dttm : dttm, msg:message}, function(err, result) {
        if(err){
            console.log(">>>  ERROR: Inserted log entry:", dttm);
            console.log("--- ",error);
        }
        else{
            console.log("\n>>>  Inserted log entry:", dttm);
            console.log("--- ",message);
        }
    });
}
