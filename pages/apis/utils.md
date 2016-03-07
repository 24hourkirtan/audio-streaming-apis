<div class="page-header">
  <h1  id="page-title">Utils</h1>
</div>





1. /ping
2. /license



___
### /ping
Simple endpoint to verifiy the API server is alive.
* Requires authentication: false
* http: true
* https: true

<br/>
```bash
GET /ping

curl -v -k --header "Accept-Version: 1.0.0" https://localhost:8081/ping
```

<br/>
Parameters
  * none


<br/>
Response
```bash
* Connected to localhost (::1) port 8081 (#0)
> GET /ping HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/7.43.0
> Accept: */*
> Accept-Version: 1.0.0
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Status: 200
< Content-Length: 49
< Date: Fri, 04 Mar 2016 11:21:45 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
{"answer":"you pinged version 1.0.0","params":{}}
```




___
### /license
Retrieves the license type.
* Requires authentication: false
* http: true
* https: true

<br/>
```bash
GET /license

curl -v --header "Accept-Version: 1.0.0" http://localhost:8081/license
```

<br/>
__Parameters__
  * none


<br/>
__Response__
```bash
* Connected to localhost (::1) port 8081 (#0)
> GET /license HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/7.43.0
> Accept: */*
> Accept-Version: 1.0.0
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Status: 200
< Content-Length: 40
< Date: Fri, 04 Mar 2016 11:32:45 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
{"license":"GNU GENERAL PUBLIC LICENSE"}
```
