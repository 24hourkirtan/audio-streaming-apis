

module.exports = {

  ping: function(req, res, next) {
    res.send(200, {answer:'you pinged version 2.0.0', message:"v2.0.0 is not in developemnt, this call exist for version testing", params:req.params});
    return next();
  }
};
