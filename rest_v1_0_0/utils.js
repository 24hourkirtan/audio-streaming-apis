

module.exports = {

  ping: function(req, res, next) {
    res.setHeader('Status', 200);
    res.send(200, {answer:'you pinged version 1.0.0'});
    return next();
  },

  license: function(req, res, next) {
    res.setHeader('Status', 200);
    res.send(200, {license:'GNU GENERAL PUBLIC LICENSE'});
    return next();
  }
};
