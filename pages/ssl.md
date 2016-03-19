<div class="page-header">
  <h1  id="page-title">SSL</h1>
</div>

All services respond only over SSL (https). Calls for services including authentication that
do not use SLL will receive a 403 Forbidden status and a simple message


```bash
$ curl -v -u user:password --header "Accept-Version: 1.0.0" http://localhost:8081/ping | python -mjson.tool

* Connected to localhost (::1) port 8081 (#0)
* Server auth using Basic with user 'user'
> GET /ping?hello=me HTTP/1.1
> Host: localhost:8081
> Authorization: Basic dXNlcjpwc3dk
> User-Agent: curl/7.43.0
> Accept: */*
> Accept-Version: 1.0.0
>
< HTTP/1.1 403 Forbidden
< Content-Type: application/json
< Content-Length: 59
< Date: Thu, 03 Mar 2016 16:45:56 GMT
< Connection: keep-alive
<
{
    "message": "the APIs are only available using SSL (https)"
}
```


___
#### Self Signed Cert for development

A self signed certificate can be used for development.

```bash
$ cd ../[project_root]/certs

$ openssl genrsa -out server-key.pem 1024
$ openssl req -new -key server-key.pem -out server-csr.pem
$ openssl x509 -req -in server-csr.pem -signkey server-key.pem -out server-cert.pem
```

___
#### config.json

Add the certificate paths to the config.json file.  This file is not part of the repo
and must be created in the project root manually. See the
__[config.json](/index.html?md=pages_config.md)__ section for more information.

```json
{
  "development":{
    "ssl_cert": "certs/server-cert.pem",
    "ssl_key":"certs/server-key.pem",
    ...
  },
  "stage":{
    "ssl_cert": "certs/server-cert.pem",
    "ssl_key":"certs/server-key.pem",
    ...
},
  "production":{
    "ssl_cert": "certs/server-cert.pem",
    "ssl_key":"certs/server-key.pem",
    ...
 }
}
```



___
<div style="margin:0 auto;text-align:center;">END</div>
