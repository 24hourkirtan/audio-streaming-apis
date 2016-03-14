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
    }
};
