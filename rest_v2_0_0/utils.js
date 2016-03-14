/**
 * Export public endpoints function
 * @type {Object}
 */
module.exports = {

    ping: function(req, res, next) {
      res.setHeader('Status', 200);
      res.setHeader('X-Version', '2.0.0');
      res.send(200, {answer: 'hello', version: '2.0.0'});
      return next();
    },

    license: function(req, res, next) {
      res.setHeader('Status', 200);
      res.setHeader('X-Version', '2.0.0');
      res.send(200, {license:'GNU GENERAL PUBLIC LICENSE', version: '2.0.0'});
      return next();
    }
};
