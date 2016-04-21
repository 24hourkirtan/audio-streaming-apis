var db = require('../ops/db');
const assert = require('assert');
var fs = require('fs');
var mm = require('musicmetadata');

// aslo try mp3-parser, id3v2-parser, avconv_id3, musicmetadata

/**
 * Export public endpoints function
 * @type {Object}
 */
module.exports = {

    ping: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        res.send(200, {answer: 'hello', version: '1.0.0'});
        return next();
    },

    license: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        res.send(200, {license:'GNU GENERAL PUBLIC LICENSE', version: '1.0.0'});
        return next();
    },





      /**
       * Gets a id3 tag set for a mp3 file.
       *
       * CURL example:
       * curl -G -v -k "https://localhost:8081/id3" \
       * --data-urlencode \
       * "path=/var/media/aindra/10.03.11-janma-tithi-kirtan-1.mp3"
       * | python -mjson.tool
       *
       * @param  {object}   req   request
       * @param  {object}   res   respone
       * @param  {next}     next  restify route pattern
       * @return {next}           restify route pattern
       */
      getId3Tags: function(req, res, next) {
          res.setHeader('X-Version', '1.0.0');
          var path = (req.params.path);
          var parser = mm(fs.createReadStream(path), function (err, metadata) {
              if (err){
                  db.insertLogs('ERROR: (utils.getId3Tags) musicmetadata',
                      { msg:'ERROR: musicmetadata while parsing:',
                        path:path,
                        err:err.toString()
                      }
                  );
                  res.send(500, err);
                  return next();
              }
              else{
                  if(metadata.picture){
                      for(var i=0; i<metadata.picture.length; i++ ){
                          delete metadata.picture[i].data;
                      }
                  }
                  res.send(200, {path:path, "developer-msg":'The tags key represents the acutal ID3 parser results', tags:metadata});
                  return next();
              }
          });
      }
};
