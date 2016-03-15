<div class="page-header">
  <h1  id="page-title">Unit Tests</h1>
</div>

Unit tests run against both public and secure endpoints. Prior to running the tests
the ip and port of the server must be part of the config.json file.

#### Test tools
The test tools are part of the dev-dependancies.
* Mocha

* SuperTest

* Should

___
## config.json
Add or update the unit_test object with the required ip and port..


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
},
  "unit_test":{
    "ip":"localhost",
    "port":"8081"
  }
}
```

___
## Run the tests
During the test there is a prompt for a valid account (email/password) which is required
to download a valid JWT token to make secure endpoint calls.

```bash
$ cd &lt;root-of-project>
$ npm test
```






___
<div style="margin:0 auto;text-align:center;">END</div>
