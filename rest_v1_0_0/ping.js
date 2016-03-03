

module.exports = {

  ping: function(req, res, next) {

    console.log(req.header('Accept-version'));
    console.log(req.isSecure());
    res.send(200, {answer:'you pinged version 1.0.0', params:req.params});
    return next();
  }
};
