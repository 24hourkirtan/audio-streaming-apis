<div class="page-header">
  <h1  id="page-title">config.json</h1>
</div>

The API server will not start properly without the presence of a __config.json__ file. This file is
not part of the project repository for security reasons. It must be created manually in the root of the project.

The file can contain as many environments as desired. The example below uses three standard
environments (development, stage, and production).

* __ssl_cert:__ path to the certificate
* __ssl_key:__ path to the certificate PEM file (w/key)
* __mp3s_paths:__ array of parent directories of MP3 files for indexing
* __db_kirtan.url:__ url of the MongoDB database that hold the db collections
* __db_kirtan.maxPoolSize:__ number of max connections to the database that can be open
* __jwt_secret:__ the secret or password to encrypt and decrypt JWT tokens
* __jwt_appkey:__ the appkey that is embedded inside a JWT token



```json
{
  "development":{
    "ssl_cert": "certs/dev-server-cert.pem",
    "ssl_key":"certs/dev-server-key.pem",
    "mp3_paths":["/path"],
    "db_kirtan":{"url":"mongodb://ipaddress:27017/kirtan", "maxPoolSize": 5},
    "jwt_secret":"secret",
    "jwt_appkey":"appkey"
  },
  "stage":{
    "ssl_cert": "/path",
    "ssl_key":"/path",
    "mp3_paths":["/path"],
    "db_kirtan":{"url":"mongodb://ipaddress:27017/kirtan", "maxPoolSize": 10},
    "jwt_secret":"secret",
    "jwt_appkey":"appkey"
},
  "production":{
    "ssl_cert": "/path",
    "ssl_key":"/path",
    "mp3_paths":["/path"],
    "db_kirtan":{"url":"mongodb://ipaddress:27017/kirtan", "maxPoolSize": 20},
    "jwt_secret":"secret",
    "jwt_appkey":"appkey"
  }
}

```


Starting the server without a config.json will result in  the following err.

```bash
npm start

> api-kirtan@0.8.0 start /Users/warren/Development/audio-streaming-apis
> node server.js

module.js:339
    throw err;
    ^

Error: Cannot find module '../config.json'
    at Function.Module._resolveFilename (module.js:337:15)
    at Function.Module._load (module.js:287:25)
    at Module.require (module.js:366:17)
    at require (module.js:385:17)
    at Object.<anonymous> (/Users/warren/Development/audio-streaming-apis/ops/db.js:4:14)
    at Module._compile (module.js:435:26)
    at Object.Module._extensions..js (module.js:442:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:311:12)
    at Module.require (module.js:366:17)
    at require (module.js:385:17)
```



___
<div style="margin:0 auto;text-align:center;">END</div>
