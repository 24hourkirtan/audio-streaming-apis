<div class="page-header">
  <h1  id="page-title">Endpoints > Utils</h1>
</div>



<table id="tbl">
  <colgroup>
    <col>
    <col>
    <col>
  </colgroup>
  <tr>
    <th>Verb</th>
    <th>Endpoint</th>
    <th>Summary</th>
  </tr>
  <tr><td>GET</td><td><a href="#get.ping">/ping</a></td><td>simple endpoint to verifiy the API server is alive</td></tr>
  <tr><td>GET</td><td><a href="#get.license">/license</a></td><td>retrieves API the license type</td></tr>
</table>




<a name="get.ping"></a>
<!-- GET /ping ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
## /ping
Simple endpoint to verifiy the API server is alive.

<br/>
#### Parameters
* None

#### Inputs
* None

<br/>
```bash
GET /ping

curl -v -k -H "Accept-Version: 1.0.0" https://localhost:8081/ping
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
< X-Version: 1.0.0
< Status: 200
< Content-Length: 49
< Date: Fri, 04 Mar 2016 11:21:45 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
{
    "answer": "hello",
    "version": "1.0.0"
}
```



<a name="get.license"></a>
<!-- GET /license ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
## /license
Retrieves the license type.

<br/>
#### Parameters
* None

#### Inputs
* None

<br/>
```bash
GET /license

curl -v _H "Accept-Version: 1.0.0" http://localhost:8081/license
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
< X-Version: 1.0.0
< Status: 200
< Content-Length: 40
< Date: Fri, 04 Mar 2016 11:32:45 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
{
    "license": "GNU GENERAL PUBLIC LICENSE",
    "version": "1.0.0"
}
```




___
<div style="margin:0 auto;text-align:center;">END</div>
___
