var path = require('path');
var recursive = require('recursive-readdir');
var fes = require('forEachAsync');
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;
var db = require('../ops/db'),
    co = require('co'),
    assert = require('assert');
var fs = require('fs');
var mm = require('musicmetadata');


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
                        var parser = mm(fs.createReadStream(file), function (err, metadata) {
                            if (err) {
                                db.insertLogs('ERROR: (Indexer.run) musicmetadata',
                                { msg:'ERROR: musicmetadata while parsing:',
                                  file:file,
                                  err:err.toString()
                                });
                                next();
                            }
                            else{
                                upsertMP3(file, metadata, collection, next);
                            }
                        });
                    }
                    catch(err){
                        db.insertLogs('ERROR: (Indexer) mm.outer.try-block:', err);
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
 * Updates a record in the MP#s or JINGLES collection. If the record does not exist
 * it is created using an upsert operation.
 * @param  {string} file            the path to the MP3 file
 * @param  {Object} id3             the extracted ID3 tag metadata
 * @param  {string} collecction     the db collection for upsert operation
 * @param  {function} callback      the callback for fes.forEachAsync operation
 * @return {Promise}
 */
function upsertMP3(file, tags, collection, callback){
    var collection = db.conn.collection(collection);


    var image = {format:'image/png', data:logoImage};
    if(tags.picture && tags.picture.length > 0){ // ARRAY
        image = tags.picture[0];
    }

    // TITLE (STRING)
    var title = (tags.title) ? tags.title : null; if(title == '') title = null;

    var artist = null; // ARTIST (ARRAY)
    if(tags.artist){
        artist = (tags.artist.length > 0) ? tags.artist[0] : null;
    }
    if(artist == '') artist = null;

    var album = null; // ALBUM (STRING)
    if(tags.album){
        album = (tags.album) ? tags.album : null;
    }
    if(album == '') album = null;

    var genre = null; // GENRE (ARRAY)
    if(tags.genre){
      genre = (tags.genre.length > 0) ? tags.genre[0] : null;
    }
    if(genre == '') genre = null;

    // YEAR (STRING)
    var year = (year) ? year : null; if(year == '') year = null;

    // RESTRICTED (BOOLEAN)
    var restricted = false;
    if(file.indexOf('/restricted/') > -1){
        restricted = true;
    }

    co(function* () {
        //console.log('\nFILE: '+file+'\n', tags)
        var result = yield collection.findOneAndUpdate({path:file},
            {$set: {title: title,
                    artist: artist,
                    album: album,
                    year: year,
                    genre: genre,
                    orphaned:false,
                    restricted: restricted,
                    image:image
                   }
            },
            {returnOriginal: false, upsert: true}
        );
        callback();
    }).catch(function(err) {
        db.insertLogs('ERROR: (upsertMP3.co) ', err);
        callback();
    });
}
