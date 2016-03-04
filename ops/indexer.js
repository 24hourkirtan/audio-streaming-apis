var path = require('path');
var recursive = require('recursive-readdir');
var async = require('async');
var jsmediatags = require("jsmediatags");
var ObjectID = require('mongodb').ObjectID;
var db = require('../ops/db'),
    co = require('co'),
    assert = require('assert');





module.exports = {

    /**
     * Recursively finds all files in the directory path passed.
     *
     * Processes only ID3 files and insert/updates (UPSERTS) metadata into the database.
     * UPSERT will create or update each ID3 record. Any files that not longer exist
     * on the file system but do in the database are tagged as ORPHANED in the database.
     * Should they reappear in the file system they are then reactivated.
     *
     * Filering of files is handed of to the private function id3Func.
     *
     * @param  {string} directoryPath path to recursively process files
     * @return {nothing}
     */
    run: function(directoryPath) {
        console.log('\n >>> ---- Indexer run ----------\n',directoryPath, process.cwd(), '\n-----------------------------')

        recursive(directoryPath, function (err, files) {
            // Files is an array of filename
            if(typeof files == 'undefined' || files == null){
                console.log('ERROR: path invalid')
                return;
            }
            files.forEach(function(file){
                if(path.extname(file) == ".mp3"){
                    jsmediatags.read(file, {
                        onSuccess: function(id3) {
                            //console.log(id3.tags.title, '; artist: ', id3.tags.artist);
                            upsertID3(file, id3);
                        },
                        onError: function(error) {
                            console.log(':(', error.type, error.info);
                        }
                    });
                }
            });
        });
    }
};


// Modify and return the modified document
function upsertID3(file, id3){
  console.log(file)
  var collection = db.conn.collection('id3');
  co(function* () {
      var result = collection.findOneAndUpdate({path:file},
            {$set: {title: id3.tags.title,artist: id3.tags.artist}},
            {returnOriginal: false, upsert: true}
      );
      return result;
  }).then(function (data) {
      console.log(data.value.title);
  }, function (err) {
      //console.error(err.stack);
      console.error(err);
  });


}
