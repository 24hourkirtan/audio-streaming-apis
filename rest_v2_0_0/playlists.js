

module.exports = {

  playlists: function(req, res, next) {
    //throw new Error('ouch 2');
    //next.ifError(null);
    
    console.log('playlists-v2')
    res.send(200, {version:'2.0.0', answer:'playlists', params:req.params});
    return next();
  },

  playlist: function(req, res, next) {
    res.send(200, {answer:'playlists', params:req.params});
    return next();
  }
};
