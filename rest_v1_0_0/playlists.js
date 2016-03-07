var jwt = require("../utils/jwt.js");

module.exports = {

  playlists: function(req, res, next) {

    console.log('playlists-v1')

    // Kicks out an error that Restify will handle
    //throw new Error('error inside Restify route scope using /playylists')

    var aid = jwt.verifyToken(req);
    console.log(aid);


    var playlist = {};
    playlist._id = "23423r23f2-232f-2f2f2ff";
    playlist.owner_id = "123412e123e-2d223d32-d23d2f23f";
    playlist.name = "my_playlist";
    playlist.mp3 = [{"_id": "1212312-d123d23d23-d3d233"}, {"_id": "7897789-34f234t23t-r34r3434v34"}];

    res.send(200, [playlist]);
    return next();
  },

  playlist: function(req, res, next) {
    res.send(200, {answer:'playlists', params:req.params});
    return next();
  }
};
