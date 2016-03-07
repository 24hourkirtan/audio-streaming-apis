var jwt = require("../utils/jwt.js");

module.exports = {

  token: function(req, res, next) {
      var encoded = req.headers.authorization.replace('Basic ', '').replace('basic ', '');
      var decoded = new Buffer(encoded, 'base64').toString('utf8').split(':');
      var username = decoded[0], pswd = decoded[1];
      console.log(username, pswd);

      // Lookup account in DB
      if(1==1){
          var token = jwt.getToken(username);
          console.log(token);
          res.send(200, {_id: 89asjasdujsd9ud9as9asdu, email:username, jwt:token});
          return next();
      }
      else{
          // NEED TO CHECK THE DATABASE
          res.send(401, {messaeg:'Not authorized'});
      }
  }



};
