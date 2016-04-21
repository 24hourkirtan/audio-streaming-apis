var db = require('../ops/db'),
    co = require('co');
const assert = require('assert');
var jwt = require("../utils/jwt.js");
var ObjectID = require('mongodb').ObjectID;

/**
 * Gets a list of all indexes related to API collections.
 * @type {Object}
 */
module.exports = {

    getIndexes: function(req, res, next) {
        res.setHeader('X-Version', '1.0.0');
        var aid = jwt.verifyToken(req, res, next);
        co(function*() {
            if(aid != null){

                var indexes = [];
                var cnt = 0;
                var c = yield db.conn.collections();
                c.forEach(function(item){

                    co(function*() {
                        var col = db.conn.collection(item.s.name);
                        var idxs = yield col.indexes();
                        cnt++;
                        for (var i=0; i<idxs.length; i++) {
                            indexes.push(idxs[i]);
                        }
                        if(cnt == c.length){
                            res.send(200, indexes);
                            return next();
                        }

                    }).catch(function(err) {
                        db.insertLogs('ERROR: (mongodb.indexInformation) '+err);
                        res.send(500, err);
                        return next();
                    });
                });
            }
        }).catch(function(err) {
            db.insertLogs('ERROR: (mongodb.getIndexes) '+err);
            res.send(500, err);
            return next();
        });
    }
}
