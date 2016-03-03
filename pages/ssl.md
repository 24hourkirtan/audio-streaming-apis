<div class="page-header">
  <h1  id="page-title">SSL</h1>
</div>

All services respond only over SSL (https). Calls for services including authentication that
do not use SLL will receive a 403 Forbidden status and a simple message


```bash
curl -v -u user:password --header "Accept-Version: 1.0.0" http://localhost:8081/ping | python -mjson.tool

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
* Connection #0 to host localhost left intact
{
    "message": "the APIs are only available using SSL (https)"
}
```

___
