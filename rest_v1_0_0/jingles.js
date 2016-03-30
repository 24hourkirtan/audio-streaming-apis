var db = require('../ops/db'),
    co = require('co');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;
var db = require('../ops/db');

/**
 * Export all functions that manage the database JINGLES collection
 * @type {Object}
 */
module.exports = {

    /**
     * Gets a single random jingle record. no authentication is required.
     * @param  {object}   req   request
     * @param  {object}   res   respone
     * @param  {next}     next  restify route pattern
     * @return {next}           restify route pattern
     */
    getRandom: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var projection = {};
        if (req.params.image == 'false'){
            projection = {"image.data":0};
        }
        co(function*() {
                var col = db.conn.collection('jingles');
                var cnt = yield col.count();
                var skip = Math.floor((Math.random() * cnt));
                var docs = yield col.find( {}, projection ).limit(1).skip(skip).toArray();
                assert.ok((docs.length < 2), 'single record find returned more than one record');
                assert.ok((docs.length == 1), 'a random jingle was not found');
                res.send(200, docs[0]);
                return next();
        }).catch(function(err) {
            db.insertLogs('ERROR: (jingle.getRandom) '+err);
            res.send(500, err);
            return next();
        });
    }
};
