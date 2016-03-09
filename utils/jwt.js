var jsonwebtoken = require('jsonwebtoken');
var config = require("../config.json") [process.env.NODE_ENV];


console.log("|>>>  jwt.js loaded");


var SECRET = "234jkf7syfh34!ufheuwfheuwrf_ghuhiuerwhuwhfgugh489gh-48hg34gh34ghrughrughurgh";
var APPKEY = "hosdji8sjjkjsd999sd9sd"; // Try not to change the app key or everyone gets logged out

module.exports = {

 	  getToken: function (aid) {
            try{
                  return jsonwebtoken.sign({aid:aid,appKey:APPKEY}, SECRET);
            }
            catch(err){
                throw new Error("Failed to generate jwt token: "+err.toString());
            }
	  },
    verifyToken: function(req, res, next){
          try{
              var token = req.headers.jwt;
              console.log('verifyToken', token);
              var decoded = jsonwebtoken.verify(token, SECRET);
              console.log("|----> verifyToken: "+JSON.stringify(decoded));
              if(decoded.appKey != APPKEY){
                  console.log("appKey wrong or missing");
                  res.send(401, 'NOT AUTH');
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
