

module.exports = {

  ping: function(req, res, next) {
    console.log('ping v2');
    res.setHeader('Status', 200);
    res.send(200, {answer:'v2.0.0 is in developemnt, this call exists for version testing'});
    return next();
  }

};
