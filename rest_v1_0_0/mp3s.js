var db = require('../ops/db'),
    co = require('co'),
    fs = require('fs');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;

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
     * @param  {Object}   res   response
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
     * @param  {Object}   res   response
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
            assert.ok((cnt == docs.length + remainingCnt + skip), 'cnt != docs.length + remainingCnt + skip');
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
     * Gets a single mp3 record using the record _id.
     * Authentication is optional.
     * @param  {object}   req   request
     * @param  {object}   res   response
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
     * Gets a list of mp3 records via POST using an array of record _ids.
     * Authentication is optional.
     * @param  {object}   req   request
     * @param  {object}   res   respone
     * @param  {next}     next  restify route pattern
     * @return {next}           restify route pattern
     */
    getByArray: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var ids = req.params;
        console.log('req.params', req.params)
        console.log('req.query', req.query)
        var restricted = false;

        // optional auth check
        if(req.headers.jwt){
          var aid = jwt.verifyToken(req, res, next);
          if(aid == null) return;
          restricted = null;
        }

        var projection = {};
        if (req.query.image == 'false'){
            projection = {"image.data":0};
        }

        for(var i=0; i<ids.length; i++){
            ids[i] = new ObjectID(ids[i]);
        }
        var query = {  _id: {$in:ids}  };
        if(restricted != null) query.restricted = false;

        co(function*() {
            var col = db.conn.collection('mp3s');
            var docs = yield col.find( query, projection ).toArray();
            res.send(200, docs);
            return next();
        }).catch(function(err) {
            db.insertLogs('ERROR: (mp3s.getByArray) '+err);
            res.send(500, err);
            return next();
        });
    },

    /**
     * Gets mp3 records using a declared key/value pair.
     * Authentication is optional.
     * @param  {object}   req   request
     * @param  {object}   res   response
     * @param  {next}     next  restify route pattern
     * @return {next}           restify route pattern
     */
    getAllByKey: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var key = (req.params.key);
        var q = (req.params.q);
        var operator = (req.params.operator) ? req.params.operator : 'equals';
        var order = (req.params.order == 'asc') ? -1 : 1;
        var orderTxt = (req.params.order) ? req.params.order : 'desc';
        var image = (req.params.image) ? req.params.image : true;


        var sortKey = (req.params.sort) ? req.params.sort : key;
        var sort = {};
        sort[sortKey] = order;
        var restricted = false;

        // optional auth check
        if(req.headers.jwt){
          var aid = jwt.verifyToken(req, res, next);
          if(aid == null) return;
          restricted = null;
        }

        var projection = {};
        if (image == 'false'){
            projection = {"image.data":0};
        }

        //http://stackoverflow.com/questions/3305561/how-do-i-query-mongodb-with-like
        var query = {orphaned:false};
        if(operator == 'beginswith')
            query[key] = new RegExp('^'+q, 'i');
        else if (operator == 'endswith')
            query[key] = new RegExp(q+'$', 'i');
        else if (operator == 'contains'){
            query[key] = new RegExp(q, 'i');
          }
        else if (operator == 'equals')
            query[key] = new RegExp('^'+q+'$', 'i');
        else {
          res.send(500, {msg:'Invalaid operator: '+operator});
          return next();
        }

        if(restricted != null) query.restricted = false;

        co(function*() {
            var col = db.conn.collection('mp3s');
            var cnt = yield col.count(query);

            var limit = (req.params.limit) ? parseInt(req.params.limit) : 10;
            var skip = (req.params.skip) ? parseInt(req.params.skip) : 0;
            var remainingCnt = (cnt-skip-limit < 0) ? 0 : cnt-skip-limit;
            // Next and Prev
            var next2 = null;
            if(skip+limit < cnt)
                next2 = '/mp3s/key/'+key+'?q='+q+'&operator='+operator+'&limit='+limit+'&skip='+(skip+limit)+'&sort='+sortKey+'&order='+orderTxt+'&image='+image;
            var prev = null;
            if(skip >= limit)
                prev = '/mp3s/key/'+key+'?q='+q+'&operator='+operator+'&limit='+limit+'&skip='+(skip-limit)+'&sort='+sortKey+'&order='+orderTxt+'&image='+image;

            var docs = yield col.find(query,projection).limit(limit).skip(skip).sort(sort).toArray();
            var remainingCnt = ((cnt-skip-limit) < 0) ? 0 : (cnt-skip-limit);
            assert.ok((cnt == docs.length + remainingCnt + skip), 'cnt != docs.length + remainingCnt + skip');
            res.send(200, { _limit:limit,
                            _key:key,
                            _q:q,
                            _operator:operator,
                            _skip:skip,
                            _totalCnt:cnt,
                            _remainingCnt:remainingCnt,
                            _returnedCnt:docs.length,
                            _sort:sortKey,
                            _order:orderTxt,
                            _next:next2,
                            _prev:prev,
                            mp3s:docs});
            return next();
        }).catch(function(err) {
            db.insertLogs('ERROR: (mp3s.getAllByKey) '+err);
            res.send(500, err);
            return next();
        });
    },

    /**
     * Returns (streams) a MP3 file.
     * Authentication is optional.
     * @param  {object}   req   request (id, aid)
     * @param  {object}   res   response
     * @param  {next}     next  restify route pattern
     * @return {next}           restify route pattern
     */
    getFile: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var id = (req.params.id);
        // The id may have an extension attached because the client player requires it.
        if(id.indexOf('.') > -1){
            id = id.split('.')[0];
        }

        // optional auth check
        if(req.headers.jwt){
          var aid = jwt.verifyToken(req, res, next);
          if(aid == null) return;
        }

        var query = {_id:ObjectID(id)};

        co(function*() {
            var col = db.conn.collection('mp3s');
            var docs = yield col.find( query, {image:0} ).toArray();
            assert.ok((docs.length < 2), 'single record find returned more than one record');
            assert.ok((docs.length == 1), 'there is no mp3 for the id passed');
            var path = docs[0].path;
            var stat = fs.statSync(path);
            res.writeHead(200, {
                    'Content-Type': 'audio/mpeg',
                    'Connection': 'close',
                    'Content-Length': stat.size
                });
            var stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on('error', function(err){
                db.insertLogs('ERROR: (mp3s.getFile.stream.on.error) '+err);
            });
            stream.on('close', function(){
                return next();
            });

        }).catch(function(err) {
            db.insertLogs('ERROR: (mp3s.getFile) '+err);
            res.send(500, err);
            return next();
        });
    }
};
