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
         * @param  {string}   message   message to log
         * @param  {object}   data      object to log, usually an error
         * @return {none}
         */
        module.exports.insertLogs = function(message, data) {
            insertLogs(message, data);
        }

        console.log('>>>  db.init');
        var url = config.db_kirtan.url;
        var maxPoolSize = config.db_kirtan.maxPoolSize;
        MongoClient.connect(url+'?maxPoolSize='+maxPoolSize, function(err, db) {
            assert.equal(null, err);
            console.log(">>>  Connected to:", url);
            database = db;
            database.on('close', dbCloseEvent );
            module.exports.conn = database;
        });

        /**
         * Closes the connection pool
         * @return {none}
         */
        module.exports.close = function(){
            console.log(">>>  Closing database connection pool");
            database.close();
        };
    }
};

/**
 * Event fired when the conneciton pool closes
 * @return {none}
 */
function dbCloseEvent(){
    console.log(">>>  Event fired DB connection pool has been shut down")
}

/**
 * Creates a log entry in the LOGS collection. LOGS is a TTL collection.
 * @param  {string}   message   message to log
 * @param  {object}   data      optional JSON object
 * @return {none}
 */
function insertLogs(message, data) {
    var collection = database.collection('logs');
    var dttm = new Date();
    collection.insertOne({dttm:dttm, msg:message, data:data}, function(err, result) {
        if(err){
            console.log(">>>  ERROR: Inserting log entry:", dttm);
            console.log("--- ", err);
        }
        else{
            console.log("\n>>>  Inserted log entry:", dttm);
            console.log(">>> ",message, data);
        }
    });
}
