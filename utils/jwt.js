var jsonwebtoken = require('jsonwebtoken');
var config = require("../config.json") [process.env.NODE_ENV];
var SECRET = config.jwt_secret;
var APPKEY = config.jwt_appkey; // Try not to change the app key or everyone gets logged out

/**
 * Export all functions that manage JWT tokens
 * @type {Object}
 */
module.exports = {

    /**
     * Creates and returns a JWT token using the account _id, logintype (local or fb)
     * using the APPKEY and SECRET from the config.json file.
     * @param  {string} aid        the _id from the accounts collection
     * @param  {string} loginType  the type of login the account uses local or fb)
     * @return {json}              a json formatted JWT token
     */
 	  getToken: function (aid, loginType) {
            try{
                  return jsonwebtoken.sign({aid:aid, type:loginType, appKey:APPKEY}, SECRET);
            }
            catch(err){
                throw new Error("Failed to generate jwt token: "+err.toString());
            }
	  },

    /**
     * Extracts the JWT token from the request header and verifies it is valid. This
     * function is not exposed to any API endpoint and is only used by endpoints
     * to valid the user.
     * @param  {object}   req   request
     * @param  {object}   res   respone
     * @param  {next}     next  restify route pattern
     * @return {string}         the _id of the account or null if token is invalid
     */
    verifyToken: function(req, res, next){
          try{
              var token = req.headers.jwt;
              var decoded = jsonwebtoken.verify(token, SECRET);
              if(decoded.appKey != APPKEY){ // appKey wrong or missing
                  res.send(401, 'NOT AUTH: token verification');
                  return null;
              }
              return decoded.aid;
          }
          catch(err){
              console.log(err);
              res.send(401, err);
              return null;
          }
    }

};
