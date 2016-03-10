var jsonwebtoken = require('jsonwebtoken');
var config = require("../config.json") [process.env.NODE_ENV];


console.log("|>>>  jwt.js loaded");

var SECRET = config.jwt_secret;
var APPKEY = config.jwt_appkey; // Try not to change the app key or everyone gets logged out

module.exports = {

 	  getToken: function (aid, loginType) {
            try{
                  return jsonwebtoken.sign({aid:aid, type:loginType, appKey:APPKEY}, SECRET);
            }
            catch(err){
                throw new Error("Failed to generate jwt token: "+err.toString());
            }
	  },
    verifyToken: function(req, res, next){
          try{
              var token = req.headers.jwt;
              //console.log('verifyToken', token);
              var decoded = jsonwebtoken.verify(token, SECRET);
              console.log("\n|----> verifyToken: "+JSON.stringify(decoded));
              if(decoded.appKey != APPKEY){
                  console.log("appKey wrong or missing");
                  res.send(401, 'NOT AUTH: token verification');
                  return null;
              }
              return decoded.aid;
          }
          catch(err){
              console.log("|----> JWT Error, verifyToken");
              console.log(err);
              res.send(401, err);
              return null;
          }
    },
    getNotAuthMsg(){
        return 'not authoized';
    }

};
