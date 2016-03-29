var path = require('path');
var recursive = require('recursive-readdir');
var fes = require('forEachAsync');
var fs = require('fs');
var jsmediatags = require("jsmediatags");
var ObjectID = require('mongodb').ObjectID;
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
     * @param  {string} directoryPath   path to recursively process files
     * @param  {string} collecction     the db collection for upsert operation
     * @return {nothing}
     */
    run: function(directoryPath, collection) {
        console.log('\n>>> ---- Indexer run ----------------------------',
          '\n>>> '+collection,
          '\n>>> '+directoryPath,
          '\n-------------------------------------------------');

        getLogoImage();

        recursive(directoryPath, function (err, files) {

            // Files is an array of filename
            if(err){
                db.insertLogs('ERROR: (Indexer) '+err);
                return;
            }
            else if(typeof files == 'undefined' || files == null){
                db.insertLogs('ERROR: (Indexer) Path invalid: '+directoryPath);
                return;
            }

            fes.forEachAsync(files, function (next, file, index, array) {
                if(path.extname(file) == ".mp3"){
                    try{
                        var projection = ["title", "year", "album", "year", "genre", "picture", "size"];
                        if(collection == 'mp3s'){
                            projection = ["title", "artist", "year", "album", "year", "genre", "picture", "size"];
                        }

                        new jsmediatags.Reader(file).setTagsToRead(projection)
                        .read({
                            onSuccess: function(id3) {
                                upsertMP3(file, id3, collection, next);
                            },
                            onError: function(error) {
                                db.insertLogs('ERROR: (Indexer) jsmediatags.read: '+ file, error);
                                next();
                            }
                        });
                    }
                    catch(err){
                        db.insertLogs('ERROR: (Indexer) jsmediatags.read.outer.try-block:', err);
                        next();
                    }
                }
                else{
                    next();
                }
            }).then(function () {
                ;
            });
        });
    },

    /**
     * Steps through the mp3s or jingles database collections and checks the path of the record
     * still exists in the file system. If it does not the record's orphaned key is set to
     * true.
     *
     * Orphaned records are not included in:
     * GET /mp3s
     * GET /jingles
     *
     * Orphaned records are included in:
     * GET /mp3:_id
     * GET /jingles:_id
     * @return {none}
     */
    tagOrphans(collection){
      try{
          console.log('\n>>> ---- Indexer tagOrphans --------------------',
            '\n>>> '+collection,
            '\n------------------------------------------------');
          var col = db.conn.collection(collection);
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
      catch(err){
          db.insertLogs('ERROR: (Indexer) tagOrphans.try-block: ', err);
      }
    }
};

var logoImage = null;
function getLogoImage(){
    if(logoImage == null){
        fs.readFile('default-image', (err, data) => {
            if (err) {
                db.insertLogs('ERROR: (Indexer) getLogoImage: ', err);
                return err.toString();
            }
            logoImage = data;
            return logoImage;
        });
    }
    else{
        return logoImage;
    }
}

/**
 * Updates a record in teh MP#s or JINGLES collection. If the record does not exist
 * it is created using an upsert operation.
 * @param  {string} file            the path to the MP3 file
 * @param  {Object} id3             the extracted ID3 tag metadata
 * @param  {string} collecction     the db collection for upsert operation
 * @param  {function} callback      the callback for fes.forEachAsync operation
 * @return {Promise}
 */
function upsertMP3(file, id3, collection, callback){
    var collection = db.conn.collection(collection);
    if(!id3.tags.picture){
        id3.tags.picture = {};
        id3.tags.picture.format = 'image/png';
        id3.tags.picture.data = logoImage;
    }
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
        db.insertLogs('ERROR: (Indexer) upsertMP3.co(): '+file, {error:err, "id3":id3} );
        callback();
    });
}
