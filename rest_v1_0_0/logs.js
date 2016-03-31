var db = require('../ops/db'),
    co = require('co');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;

/**
 * Export all functions that manage the database LOGS collection.
 * @type {Object}
 */
module.exports = {

    /**
     * Return an array of all log records using optional parameters.
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
                var col = db.conn.collection('logs');

                // Parameters
                var limit = (req.params.limit) ? parseInt(req.params.limit) : 10;
                var skip = (req.params.skip) ? parseInt(req.params.skip) : 0;
                var remainingCnt = (cnt-skip-limit < 0) ? 0 : cnt-skip-limit;
                var sort = (req.params.sort) ? req.params.sort : 'dttm';
                var order = (req.params.order == 'asc') ? -1 : 1;
                var orderTxt = (req.params.order) ? req.params.order : 'desc';

                var cnt = yield col.count(); // Uses system metadata

                // Next and Prev
                var next2 = null;
                if(skip+limit < cnt)
                    next2 = '/logs?limit='+limit+'&skip='+(skip+limit)+'&sort='+sort+'&order='+orderTxt;
                var prev = null;
                if(skip >= limit)
                    prev = '/logs?limit='+limit+'&skip='+(skip-limit)+'&sort='+sort+'&order='+orderTxt;

                // Sort
                var sortSyntax = {};
                sortSyntax[sort] = order;

                // Data
                var docs = yield col.find({}).limit(limit).skip(skip).sort(sortSyntax).toArray();
                var remainingCnt = ((cnt-skip-limit) < 0) ? 0 : (cnt-skip-limit);
                res.send(200, { _limit:limit,
                                _skip:skip,
                                _totalCnt:cnt,
                                _remainingCnt:remainingCnt,
                                _returnedCnt:docs.length,
                                _sort:sort,
                                _order:orderTxt,
                                _next:next2,
                                _prev:prev,
                                logs:docs});
                return next();
            }
        }).catch(function(err) {
            db.insertLogs('ERROR: (logs.getAll) '+err);
            res.send(500, err);
            return next();
        });
    }
};
