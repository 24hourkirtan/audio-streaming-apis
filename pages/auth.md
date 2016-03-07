<div class="page-header">
  <h1  id="page-title">Authentication</h1>
</div>

The API supports JWT Authentication over SSL. To use any secure endpoint a JWT token must
be acquired using the username (email) and password of a valid account. Any subsequent call to a
secure endpoint must carry the token of the request header.


#### curl -v -H "$(cat headers.txt)" yourhost.com

The following curl example shows how to get a token using Basic Auth. The -u parameter will
convert the credential to a header osbject while the version is set directly into the header.

<br/>
```bash
curl -v -k -u user:pswd -H "Accept-Version: 1.0.0" https://localhost:8081/account/token | python -mjson.tool

* Connected to localhost (::1) port 8081 (#0)
* TLS 1.2 connection using TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
* Server certificate: Anderson
* Server auth using Basic with user 'account'
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
{ [182 bytes data]
100   182  100   182    0     0   3890      0 --:--:-- --:--:-- --:--:--  3956
* Connection #0 to host localhost left intact
{
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhaWQiOiJhY2NvdW50IiwiYXBwS2V5IjoiaG9zZGppOHNqamtqc2Q5OTlzZDlzZCIsImlhdCI6MTQ1NzM3OTk2Nn0.dDqMQXD4m5kXxBu-cgW-noJl9s-bnNt24fFgVH2cNpU"
}
```

___
