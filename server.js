var restify = require('restify'),
utils_1_0_0 = require('./rest_v1_0_0/utils'),
utils_2_0_0 = require('./rest_v2_0_0/utils'),
playlists_1_0_0 = require('./rest_v1_0_0/playlists'),
mp3s_1_0_0 = require('./rest_v1_0_0/mp3s'),
jingles_1_0_0 = require('./rest_v1_0_0/jingles'),
logs_1_0_0 = require('./rest_v1_0_0/logs'),
accounts_1_0_0 = require('./rest_v1_0_0/accounts'),
fs = require('fs'),
indexer = require('./ops/indexer'),
db = require('./ops/db'),
config = require("./config.json") [process.env.NODE_ENV];

// -----------------------
// Connect to the database
db.init();

// ------------------------------
//uncaughtException event handler
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

// ----------------
// Last exit signal
process.on('exit', function (event) {
    console.error('\n****************** EXIT ********************');
    console.log(event);
    console.log('\n');
});

// ------------------------------------------------------
// System shutdown, provide graceful DB close if possible
process.on('SIGINT', function () {
  console.error('\n****************** GRACEFUL SHUTDOWN ********************');
  server.close(function () {
      db.close();
      process.exit(0);
  });
});

// -------------------------------------------------
// Defines the Restify HTTPS server process to start
console.log('>>>  Certificate: ',config.ssl_cert);
console.log('>>>  Cert Key:    ',config.ssl_key);
var server = restify.createServer({
    certificate: fs.readFileSync(config.ssl_cert),
    key: fs.readFileSync(config.ssl_key),
    name: 'apis-kirtan.io',
});

// ----------------------------------
// Starts Restify as an HTTPS process
console.log('>>>  ENV:         ', process.env.NODE_ENV);
console.log('>>>  PORT:        ', config.port);
server.listen(config.port);

// -------
// Parsers - CORS
// https://github.com/restify/node-restify/issues/664
server.use(restify.CORS({
    credentials: true
}));
server.use(restify.queryParser());
server.use(restify.bodyParser());


// ----------------------------------------
// Stops anything that may not be using SSL
server.use(function checkSLL(req, res, next) {
    if(!req.isSecure()){
        res.send(403, {message:"the APIs are only available using SSL (https)"});
    }
    else{
        return next();
    }
});


// ---------------------------------------
// Force all Restify routes to return JSON
server.use(function send(req, res, next) {
    res.setHeader('content-type', 'application/json');
    return next();
});

// -------------------------------------------------
// PUBLIC ROUTES - (no auth) w/Accept-Version header
server.get({path: "/ping", version: '1.0.0'}, utils_1_0_0.ping);
server.get({path: "/ping", version: '2.0.0'}, utils_2_0_0.ping);
server.get({path: "/license", version: '1.0.0'}, utils_1_0_0.license);


// -----------------------------------------------------------
// BASIC ROUTES - (requires Bsic auth) w/Accept-Version header
server.get({path: "/account/token", version: '1.0.0'}, accounts_1_0_0.getToken);

// ----------------------------------------------------
// AUTH ROUTES - (requires JWT) w/Accept-Version header
server.get({path: "/account", version: '1.0.0'}, accounts_1_0_0.get);
server.post({path: "/account", version: '1.0.0'}, accounts_1_0_0.create);
server.patch({path: "/account/:_id", version: '1.0.0'}, accounts_1_0_0.modify);

server.get({path: "/mp3s", version: '1.0.0'}, mp3s_1_0_0.getAll);
server.get({path: "/mp3s/distinctkey/:key", version: '1.0.0'}, mp3s_1_0_0.getDistinctKey);
server.get({path: "/mp3s/key/:key", version: '1.0.0'}, mp3s_1_0_0.getAllByKey);
server.get({path: "/mp3/:id", version: '1.0.0'}, mp3s_1_0_0.get);

server.get({path: "/jingle/random", version: '1.0.0'}, jingles_1_0_0.getRandom);

server.get({path: "/playlists", version: '1.0.0'}, playlists_1_0_0.getAll);
server.get({path: "/playlist/:_id", version: '1.0.0'}, playlists_1_0_0.get);
server.post({path: "/playlist", version: '1.0.0'}, playlists_1_0_0.create);
server.patch({path: "/playlist/:_id", version: '1.0.0'}, playlists_1_0_0.modify);
server.del({path: "/playlist/:_id", version: '1.0.0'}, playlists_1_0_0.delete);

server.get({path: "/logs", version: '1.0.0'}, logs_1_0_0.getAll);
server.get({path: "/id3", version: '1.0.0'}, utils_1_0_0.getId3Tags);


// ----------------------------------------
// ------- MP3S ---------------------------
var secs = 4.68e+7; // 13 hours
config.mp3_paths.forEach(function(path){
    setTimeout(function() {
        indexer.run(path, 'mp3s');
    }, 3000);
    setInterval(function() {
        indexer.run(path, 'mp3s');
    }, secs);
    secs = (secs +30000);
});

// Indexer tagOrphaned()
setTimeout(function() {
    indexer.tagOrphans('mp3s');
}, 20000);// 20 seconds
setInterval(function() {
    indexer.tagOrphans('mp3s');
}, secs);


// ----------------------------------------
// ------- JINGLES ------------------------
secs = (secs +30000);
config.jingle_paths.forEach(function(path){
    setTimeout(function() {
        indexer.run(path, 'jingles');
    }, 6000);
    setInterval(function() {
        indexer.run(path, 'jingles');
    }, secs);
    secs = (secs +30000);
});

// Indexer tagOrphaned() interval
setTimeout(function() {
    indexer.tagOrphans('jingles');
}, 23000);// 20 seconds
setInterval(function() {
    indexer.tagOrphans('jingles');
}, secs);
