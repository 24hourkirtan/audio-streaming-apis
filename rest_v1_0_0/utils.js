var db = require('../ops/db');
const assert = require('assert');
var jsmediatags = require("jsmediatags");

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
       * "path=/Users/warren/Downloads/mp3-id3-tag-samples/worldwide-old/2012/2012-bhakti-fest/prema-hara-maha-mantra.mp3"
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
          //var projection = ["title", "year", "album", "year", "genre", "picture", "size"];
          //new jsmediatags.Reader(path).setTagsToRead(projection)
          //.read({
          new jsmediatags.read(path, {
              onSuccess: function(id3) {
                  //id3.x_path = path;
                  delete id3.tags.picture.data;
                  res.send(200, id3.tags);
                  return next();
              },
              onError: function(error) {
                  db.insertLogs('ERROR: (id3.get) jsmediatags.read: '+ file, error);
                  db.insertLogs('ERROR: (id3.get)', err);
                  res.send(500, err);
                  return next();
              }
          });
      }
};
