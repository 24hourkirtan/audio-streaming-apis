

module.exports = {

  ping: function(req, res, next) {
    console.log('ping v1');
    res.setHeader('Status', 200);
    res.send(200, {answer:'you pinged version 1.0.0'});
    return next();
  },

  license: function(req, res, next) {
    console.log('license v1');
    res.setHeader('Status', 200);
    res.send(200, {license:'GNU GENERAL PUBLIC LICENSE'});
    return next();
  }
};
