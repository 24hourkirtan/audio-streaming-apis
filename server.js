var restify = require('restify'),
utils_1_0_0 = require('./rest_v1_0_0/utils'),
utils_2_0_0 = require('./rest_v2_0_0/utils'),
playlists_1_0_0 = require('./rest_v1_0_0/playlists'),
fs = require('fs'),
indexer = require('./ops/indexer'),
db = require('./ops/db')
;
var config = require("./config.json") [process.env.NODE_ENV];

db.init();

/**
 * uncaughtException event handler.
 * Necessary for everything that isn't route / middleware related.
 * @param  {string}   uncaughtException   event name
 * @param  {callback} function(err)       err value to process
 * @return {none}
 */
process.on('uncaughtException', function (err) {
    console.error('\n****************** START uncaughtException ********************');
    console.error('Un-Caught exception (reported from server.js): ');
    //db.closeAll();
    console.error(err);
    console.error(err.stack);
    console.error('****************** END uncaughtException ********************\n');
    err = err || {};
    if (!(err.status >= 400 && err.status <= 499)) {
        process.nextTick( process.exit(1) );
    }
    else{
        process.exit(99);
    }
});

process.on('SIGINT', function () {
  console.error('\n****************** GRACEFUL SHUTDOWN ********************');
  server.close(function () {

      db.close();
      process.exit(0);
  });
});


/**
 * Defines the Restify server process to start
 * @param  {object} {} startup definitons including the SLL certificate and process name
 * @return {nothing}   [description]
 */
var server = restify.createServer({
  //certificate: fs.readFileSync('path/to/server/certificate'),
  //key: fs.readFileSync('path/to/server/key'),
  name: 'APIs-kirtan.io',
});


var port = 8081;
/**
 * Starts Restify as an HTTPS process
 * @param  {number} port The port number to run the process on
 * @return {none}      [description]
 */
server.listen(port);


/**
 * Force all Restify routes to return JSON
 * @param  {function} function send(req, res, next)  standard route parameters
 * @return {next}
 */
server.use(function send(req, res, next) {
    res.setHeader('content-type', 'application/json');
    return next();
});

// HTTP ROUTES - w/Accept-Version header
server.get({path: "/ping", version: '1.0.0'}, utils_1_0_0.ping);
server.get({path: "/ping", version: '2.0.0'}, utils_2_0_0.ping);
server.get({path: "/license", version: '1.0.0'}, utils_1_0_0.license);

// All routes beyond this point require authentication
// --------------------------------------------------



/**
 * Prevents use off all routes except those over SSL
 * @param  {function} function send(req, res, next)  standard route parameters
 * @return {next}
 */
server.use(function ssl(req, res, next) {
    /*if(!req.isSecure()){
        res.send(403, {message:"the APIs are only available using SSL (https)"});
        return next();
    }*/
    return next();
});

// HTTPS ROUTES - w/Accept-Version header
server.get({path: "/playlists", version: '1.0.0'}, playlists_1_0_0.playlists);
server.get({path: "/playlist/:id", version: '1.0.0'}, function(req, res, next){
    res.send(200, {});
    return next();
});

var interval = setInterval(function() {
    config.mp3_paths.forEach(function(path){
        indexer.run(path);
    });
}, 5000);
var timeout = setTimeout(function() {
    config.mp3_paths.forEach(function(path){
        indexer.run(path);
    });
}, 300000);






//setInterval(indexer, 5000);
