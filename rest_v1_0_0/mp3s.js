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
     * Return an array of all mp3 records using optional parameters
     * @param  {Object}   req   request
     * @param  {Object}   res   respone
     * @param  {next}     next  restify route pattern
     * @return {next}           restify route pattern
     */
    getAll: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var aid = jwt.verifyToken(req, res, next);

        co(function*() {

            if(aid != null){
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

                // Projection
                var projection = {"trash":0};
                if (req.params.image == 'false'){
                    projection = {"trash":0,"image.data":0};
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
            }
        }).catch(function(err) {
            db.insertLogs('ERROR: (mp3s.getAll) '+err);
            res.send(500, err);
            return next();
        });
    },

    /**
     * Gets a single mp3 record using the record id
     * @param  {object}   req   request
     * @param  {object}   res   respone
     * @param  {next}     next  restify route pattern
     * @return {next}           restify route pattern
     */
    get: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var id = (req.params.id);
        var aid = jwt.verifyToken(req, res, next);
        var projection = {"trash":0};
        if (req.params.image == 'false'){
            projection = {"trash":0,"image.data":0};
        }

        co(function*() {
            if(aid != null){
                var col = db.conn.collection('mp3s');
                var docs = yield col.find( {_id:ObjectID(id)}, projection ).toArray();
                assert.ok((docs.length < 2), 'single record find returned more than one record');
                assert.ok((docs.length == 1), 'there is no mp3 for the id passed');
                res.send(200, docs[0]);
                return next();
            }
        }).catch(function(err) {
            db.insertLogs('ERROR: (mp3s.get) '+err);
            res.send(500, err);
            return next();
        });
    }
};
