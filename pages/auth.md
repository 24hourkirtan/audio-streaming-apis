<div class="page-header">
  <h1  id="page-title">Authentication</h1>
</div>

The API supports JWT Authentication over SSL. To use any secure endpoint a JWT token must
be acquired using the username (email) and password of a valid account. Any subsequent call to a
secure endpoint must carry the token of the request header. Not all endpoints require a JWT token. Some endpoints
will respond with or without a JWT token. Those that respond without will return a filtered result
set of non-restricted materials.


#### curl -v -H "$(cat headers.txt)" yourhost.com

The following curl example shows how to get a token using Basic Auth. The -u parameter will
convert the credential to a header object while the version is set directly into the header.


```bash
$ curl -v -k -X GET \
-u email@wdomain.com:pswd \
-H "Accept-Version: 1.0.0" \
https://localhost:8081/account/token | python -mjson.tool

* Connected to localhost (::1) port 8081 (#0)
* TLS 1.2 connection using TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
* Server certificate: Anderson
* Server auth using Basic with user 'email@wdomain.com'
> GET /account/token HTTP/1.1
> Host: localhost:8081
> Authorization: Basic YWNjb3VudDpwYXNzd29yZA==
> User-Agent: curl/7.43.0
> Accept: */*
> Accept-Version: 1.0.0
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Content-Length: 182
< Date: Mon, 07 Mar 2016 19:46:06 GMT
< Connection: keep-alive
<
{
   "_id": "56e1d499a9689c1b09d8c4b5",
   "email": "email@wdomain.com",
   "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```




___
<div style="margin:0 auto;text-align:center;">END</div>
