var db = require('../ops/db'),
    co = require('co');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;
var db = require('../ops/db');

/**
 * Export all functions that manage the database MP3S collection
 * @type {Object}
 */
module.exports = {

    /**
     * Gets a distinct list of key values from the MP3s collection. Any key can
     * be queried. A valid key would return a distinct list of the key values
     * including nulls. The list is not sorted. An invalid key returns no results.
     * Authentication is optional.
     * @param  {Object}   req   request
     * @param  {Object}   res   respone
     * @param  {next}     next  restify route pattern
     * @return {next}           restify route pattern
     */
    getDistinctKey: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var restricted = {restricted:false};

        // optional auth check
        if(req.headers.jwt){
          var aid = jwt.verifyToken(req, res, next);
          if(aid == null) return;
          restricted = {};
        }

        co(function*() {
            var col = db.conn.collection('mp3s');
            // Parameters
            var key = req.params.key;

            // Data
            var docs = yield col.distinct(key, restricted);
            res.send(200, docs);
            return next();
        }).catch(function(err) {
            db.insertLogs('ERROR: (mp3s.getDistinctKey) '+err);
            res.send(500, err);
            return next();
        });
    },

    /**
     * Return an array of all mp3 records using optional parameters.
     * Authentication is optional.
     * @param  {Object}   req   request
     * @param  {Object}   res   respone
     * @param  {next}     next  restify route pattern
     * @return {next}           restify route pattern
     */
    getAll: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var restricted = false;

        // optional auth check
        if(req.headers.jwt){
          var aid = jwt.verifyToken(req, res, next);
          if(aid == null) return;
          restricted = null;
        }

        co(function*() {
            var col = db.conn.collection('mp3s');

            // Parameters
            var limit = (req.params.limit) ? parseInt(req.params.limit) : 10;
            var skip = (req.params.skip) ? parseInt(req.params.skip) : 0;
            var remainingCnt = (cnt-skip-limit < 0) ? 0 : cnt-skip-limit;
            var sort = (req.params.sort) ? req.params.sort : 'title';
            var order = (req.params.order == 'asc') ? -1 : 1;
            var orderTxt = (req.params.order) ? req.params.order : 'desc';
            var image = (req.params.image) ? req.params.image : true;
            var query = (req.params.q) ? {orphaned:false, $text:{$search:req.params.q}} : {orphaned:false};
            if(restricted != null) query.restricted = false;

            // Projection
            var projection = {};
            if (req.params.image == 'false'){
                projection = {"image.data":0};
            }

            // Get record count
            var cnt = yield col.count(query);

            var q = '';
            if(query.$text)
                q = req.params.q;

            // Next and Prev
            var next2 = null;
            if(skip+limit < cnt)
                next2 = '/mp3s?q='+q+'&limit='+limit+'&skip='+(skip+limit)+'&sort='+sort+'&order='+orderTxt+'&image='+image;
            var prev = null;
            if(skip >= limit)
                prev = '/mp3s?q='+q+'&limit='+limit+'&skip='+(skip-limit)+'&sort='+sort+'&order='+orderTxt+'&image='+image;

            // Sort
            var sortSyntax = {};
            sortSyntax[sort] = order;

            // Data
            var docs = yield col.find(query,projection).limit(limit).skip(skip).sort(sortSyntax).toArray();
            var remainingCnt = ((cnt-skip-limit) < 0) ? 0 : (cnt-skip-limit);
            res.send(200, { _limit:limit,
                            _q:q,
                            _skip:skip,
                            _totalCnt:cnt,
                            _remainingCnt:remainingCnt,
                            _returnedCnt:docs.length,
                            _sort:sort,
                            _order:orderTxt,
                            _next:next2,
                            _prev:prev,
                            mp3s:docs});
            return next();
        }).catch(function(err) {
            db.insertLogs('ERROR: (mp3s.getAll) '+err);
            res.send(500, err);
            return next();
        });
    },

    /**
     * Gets a single mp3 record using the record id.
     * Authentication is optional.
     * @param  {object}   req   request
     * @param  {object}   res   respone
     * @param  {next}     next  restify route pattern
     * @return {next}           restify route pattern
     */
    get: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var id = (req.params.id);
        var restricted = false;

        // optional auth check
        if(req.headers.jwt){
          var aid = jwt.verifyToken(req, res, next);
          if(aid == null) return;
          restricted = null;
        }

        var projection = {};
        if (req.params.image == 'false'){
            projection = {"image.data":0};
        }
        var query = {_id:ObjectID(id)};
        if(restricted != null) query.restricted = false;

        co(function*() {
            var col = db.conn.collection('mp3s');
            var docs = yield col.find( query, projection ).toArray();
            assert.ok((docs.length < 2), 'single record find returned more than one record');
            assert.ok((docs.length == 1), 'there is no mp3 for the id passed');
            res.send(200, docs[0]);
            return next();
        }).catch(function(err) {
            db.insertLogs('ERROR: (mp3s.get) '+err);
            res.send(500, err);
            return next();
        });
    },

    /**
     * Gets mp3 records using a declared key/value pair.
     * Authentication is optional.
     * @param  {object}   req   request
     * @param  {object}   res   respone
     * @param  {next}     next  restify route pattern
     * @return {next}           restify route pattern
     */
    getAllByKey: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var key = (req.params.key);
        var operator = (req.params.operator) ? req.params.operator : 'equals';
        var order = (req.params.order == 'asc') ? -1 : 1;
        var sortKey = (req.params.sort) ? req.params.sort : "artist";
        var sort = [];
        sort[sortKey] = order;
        var restricted = false;

        // optional auth check
        if(req.headers.jwt){
          var aid = jwt.verifyToken(req, res, next);
          if(aid == null) return;
          restricted = null;
        }

        var projection = {};
        if (req.params.image == 'false'){
            projection = {"image.data":0};
        }

        //http://stackoverflow.com/questions/3305561/how-do-i-query-mongodb-with-like
        var query = {orphaned:false};
        if(operator == 'beginswith')
            query[key] = new RegExp('^'+req.params.q, 'i');
        else if (operator == 'endswith')
            query[key] = new RegExp(req.params.q+'$', 'i');
        else if (operator == 'contains'){
            query[key] = new RegExp(req.params.q, 'i');
          }
        else if (operator == 'equals')
            query[key] = new RegExp('^'+req.params.q+'$', 'i');
        else {
          res.send(500, {msg:'Invalaid operator: '+operator});
          return next();
        }

        if(restricted != null) query.restricted = false;

        console.log(query)

        co(function*() {
            var col = db.conn.collection('mp3s');
            //var cnt = yield col.count(query);
            var docs = yield col.find( query, projection ).sort(sort).toArray();
            res.send(200, docs);
            return next();
        }).catch(function(err) {
            db.insertLogs('ERROR: (mp3s.get) '+err);
            res.send(500, err);
            return next();
        });
    }
};
