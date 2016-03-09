var path = require('path');
var recursive = require('recursive-readdir');
var async = require('async');
var jsmediatags = require("jsmediatags");




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
    console.log(directoryPath, process.cwd(), '\n-----------------')

    recursive(directoryPath, function (err, files) {
      // Files is an array of filename
      files.forEach(function(file){
        if(path.extname(file) == ".mp3"){
            jsmediatags.read(file, {
                onSuccess: function(tag) {
                    console.log(tag.tags.title, '; artist: ', tag.tags.artist);
                    console.log('   ', file);
                },
                onError: function(error) {
                    console.log(':(', error.type, error.info);
                }
            });
        }
      });


    });


      /*recursive(directoryPath, [id3FileFilter], function (err, files) {
          // Files is an array of filenames
          // Filtering is delegated to the private function id3FileFilter

          files.forEach(function(file){
              if(path.extname(file) == '.id3'){
                  console.log('Process file here', file);
              }
          })
      });*/
  }
};





/**
 * Filters the files list for the recursive directory reader
 *
 * @param  {string} file      file is the absolute path to the file
 * @param  {fs.Stats} stats   stats is an fs.Stats object
 * @return {boolean}          false if not an id3 extension, meaning to exclude
 */
function id3FileFilter(file, stats) {
  console.log(file);
    if (stats.isDirectory()){
        //console.log('DIR: ', file);
        //this.run(file);
    }
    return path.extname(file) != ".id3";
}
