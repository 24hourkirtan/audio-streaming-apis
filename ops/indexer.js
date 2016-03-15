var path = require('path');
var recursive = require('recursive-readdir');
var fes = require('forEachAsync');
var jsmediatags = require("jsmediatags");
var ObjectID = require('mongodb').ObjectID;
var fs = require("fs");
var db = require('../ops/db'),
    co = require('co'),
    assert = require('assert');

/**
 * Export all functions that manage the Indexer process
 * @type {Object}
 */
module.exports = {

    /**
     * Recursively finds all MP3 files in the directory path passed.
     *
     * Processes files using UPSERTS (insert/updates) pushing ID3 metadata into the database.
     * Any files that no longer exist
     * on the file system but do in the database are tagged as ORPHANED in the database.
     * Should they reappear in the file system they are then reactivated.
     *
     * Filtering of files is handed of to the private function upsertMP3.
     *
     * Promises with YIELD are used to throttle the UPSERTS which could overwhelm a
     * virtual CPU.
     *
     * @param  {string} directoryPath path to recursively process files
     * @return {nothing}
     */
    run: function(directoryPath) {
        console.log('\n>>> ---- Indexer run ----------------------------',
          '\n>>> '+directoryPath,
          '\n------------------------------------------------');

        recursive(directoryPath, function (err, files) {
            // Files is an array of filename
            if(typeof files == 'undefined' || files == null){
                db.insertLogs('ERROR: (Indexer) Start path invalid: '+directoryPath);
                return;
            }
            fes.forEachAsync(files, function (next, file, index, array) {
                if(path.extname(file) == ".mp3"){
                    jsmediatags.read(file, {
                        onSuccess: function(id3) {
                            upsertMP3(file, id3, next);
                        },
                        onError: function(error) {
                            db.insertLogs('ERROR: (Indexer) jsmediatags.read: '+ error);
                            next();
                        }
                    });
                }
                else{
                    next();
                }
            }).then(function () {
                db.insertLogs('Indexer: All files finished for :'+directoryPath);
            });
        });
    },

    /**
     * Steps through the mp3s database collection and checks the path of the record
     * still exists in the file system. If it does not the record's orphaned key is set to
     * true. Orphaned records are not included in GET /mp3s but are in GET /mp3:_id.
     * @return {none}
     */
    tagOrphans(){
        console.log('\n>>> ---- Indexer tagOrphans ----------------------------');
        var col = db.conn.collection('mp3s');
        col.find().forEach(function(doc){
            fs.exists(doc.path,function(exists){
                if (!exists){
                    col.findOneAndUpdate({_id:ObjectID(doc._id)},
                        {$set: {orphaned:true}},
                        {returnOriginal: false, upsert: false}
                    );
                } // end if
            }); // end fs.exists
        }); // end col.find()
    }
};

/**
 * [upsertMP3 description]
 * @param  {string} file    the path to the MP3 file
 * @param  {Object} id3     the extracted ID3 tag metadata
 * @return {Promise}
 */
function upsertMP3(file, id3, callback){
    //console.log("--------------------------",id3)
    var collection = db.conn.collection('mp3s');
    co(function* () {
        var result = yield collection.findOneAndUpdate({path:file},
              {$set: {title: id3.tags.title,
                      artist: id3.tags.artist,
                      album: id3.tags.album,
                      year: id3.tags.year,
                      genre: id3.tags.genre,
                      size: id3.size,
                      orphaned:false,
                      image:{format:id3.tags.picture.format,
                               data:id3.tags.picture.data
                             }
                     }
              },
              {returnOriginal: false, upsert: true}
        );
        return result;
    }).then(function (data) {
        //console.log(data);
        callback();
    }, function (err) {
        db.insertLogs('ERROR: (Indexer) upsertMP3.co: '+ err);
    });
}
