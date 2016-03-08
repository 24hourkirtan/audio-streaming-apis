var ObjectID = require('mongodb').ObjectID;
var db = require('../ops/db'),
    co = require('co'),
    assert = require('assert');
var jwt = require("../utils/jwt.js");

module.exports = {

    getAll: function(req, res, next) {
        console.log('\nmp3s-v1.songs', req.params)

        var aid = jwt.verifyToken(req, res, next);

        co(function*() {

            if(aid != null){
                var col = db.conn.collection('mp3s');

                var cnt = yield col.count();
                var limit = (req.params.limit) ? parseInt(req.params.limit) : 10;
                var skip = (req.params.skip) ? parseInt(req.params.skip) : 0;
                var remainingCnt = (cnt-skip-limit < 0) ? 0 : cnt-skip-limit;
                var sort = (req.params.limit) ? parseInt(req.params.limit) : 10;
                var sort = (req.params.sort) ? req.params.sort : 'title';
                var order = (req.params.order == 'asc') ? -1 : 1;

                var sortSyntax = {};
                sortSyntax[sort] = order;
                var query = (req.params.q) ? {$text:{$search:req.params.q}} : {};

                var docs = yield col.find(query,{picture:0}).limit(limit).skip(skip).sort(sortSyntax).toArray();

                //assert.equal(2, docs.length);
                res.send(200, { _limit:limit,
                                _skip:skip,
                                _collectionCnt:cnt,
                                _remainingCnt:remainingCnt,
                                _returnedCnt:docs.length,
                                _sort:sort,
                                _order:order,
                                data:docs});
                return next();
            }
        }).catch(function(err) {
            console.log(err.stack);
            res.send(500, err);
            return next();
        });
    }
};
