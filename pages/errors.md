<div class="page-header">
  <h1  id="page-title">Errors</h1>
</div>

The handling of errors by the APIs attempts to follow a pattern to allow for expected
behavior.

___
#### API generated errors

When a request generates an error a standard response is returned. The status in the header is set
to a code that best represents the error. The following shows how the status is set for a
request that is not authorized.


```javascript
res.send(401, {"documentation_url": "http://http://blog.kirtan.io/audio-streaming-apis/index.html?md=pages_auth.md",
          "message": "Requires authentication"});
return next();
```

___
#### UncaughtExceptions (inside route scope)
When an unexpected error occurs inside the scope (execution path) of a Restify route the error
is handled by Restify. Restify will return a header status of 500 (Internal Server Error) and a body object
of an InternalError.
The following example shows the results of placing a throw statement inside a function of the /utils/indexer.js
file that is in the Restify route execution path.


```bash
curl -v --header "Accept-Version: 1.0.0" http://localhost:8081/playlists  | python -mjson.tool  

* Connected to localhost (::1) port 8081 (#0)
> GET /playlists HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/7.43.0
> Accept: */*
> Accept-Version: 1.0.0
>
< HTTP/1.1 500 Internal Server Error
< Content-Type: application/json
< Content-Length: 87
< Date: Thu, 03 Mar 2016 14:28:01 GMT
< Connection: keep-alive
<
{ [87 bytes data]
100    87  100    87    0     0   3263      0 --:--:-- --:--:-- --:--:--  3346
* Connection #0 to host localhost left intact
{
    "code": "InternalError",
    "message": "error inside Restify route scope using /playylists"
}
```




___
#### UncaughtExceptions (outside route scope)
When an unexpected error occurs outside the scope (execution path) of a Restify route the error
is handled by the uncaughtException handler found in the server.js file. This type of error is
fatal and will cause the Node process to exit. If the Node process was started with Forever then the Node
process will restart.

The following example shows the results of placing a throw statement inside a function of the /utils/indexer.js
file that is not in the Restify route execution path.

```javascript
// Test error thrown inside /utils/indexer.js (not in Restify route)
...
throw new Error('Indexer ouch');
...

****************** START uncaughtException ********************
Un-Caught exception (reported from server.js):
[Error: Indexer ouch]
Error: Indexer ouch
    at Object.module.exports.run (/Users/warren/Development/audio-streaming-apis/utils/indexer.js:22:11)
    at Object.<anonymous> (/Users/warren/Development/audio-streaming-apis/server.js:71:9)
    at Module._compile (module.js:435:26)
    at Object.Module._extensions..js (module.js:442:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:311:12)
    at Function.Module.runMain (module.js:467:10)
    at startup (node.js:134:18)
    at node.js:961:3
****************** END uncaughtException ********************
```


___
