<div class="page-header">
  <h1  id="page-title">Versions</h1>
</div>

Currently the default version of the API is 1.0.0. The version number is returned
to all endpoint calls in the response header as __X-Version__.

```bash
< HTTP/1.1 200 OK
< Content-Type: application/json
< X-Version: 1.0.0
< Content-Length: 58
< Date: Mon, 14 Mar 2016 20:10:52 GMT
< Connection: keep-alive
```

Any request that does not specify a version will receive the default version.
It is best to request a specific version via the Accept-Version header for expected behavior and
allow for an easier migration path to future releases.
If an invalid version is in the Accept-Version header an error (HTTP/1.1 400 Bad Request) is returned.

<br/>
<table id="tbl">
<colgroup><col><col><col><col></colgroup>
  <tr>
    <th>Version</th>
    <th>Default</th>
    <th>Status</th>
    <th>Header</th>
  </tr>
  <tr>
    <td>v1.0.0</td>
    <td>X</td>
    <td>Beta</td>
    <td>"Accept-Version: 1.0.0"</td>
  </tr>
  <tr>
    <td>v2.0.0</td>
    <td></td>
    <td>Design</td>
    <td>"Accept-Version: 2.0.0"</td>
  </tr>
</table>



___
#### CURL example valid Accept-Version  
```bash
curl -v -u <user>:<pswd> --header "Accept-Version: 1.0.0" https://localhost:8081/playlists  | python -mjson.tool  

* Connected to localhost (::1) port 8081 (#0)
> GET /playlists HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/7.43.0
> Accept: */*
> Accept-Version: 1.0.0
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< X-Version: 1.0.0
< Content-Length: 184
< Date: Wed, 02 Mar 2016 12:04:58 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
{
    "_id": "23423r23f2-232f-2f2f2ff",
    "name": "my_playlist",
    "songs": [
        {
            "id3": "1212312-d123d23d23-d3d233"
        },
        {
            "id3": "7897789-34f234t23t-r34r3434v34"
        }
    ],
    "owner_id": "123412e123e-2d223d32-d23d2f23f"
}
```


___
#### CURL example invalid Accept-Version
```bash
curl -v -u <user>:<pswd> --header "Accept-Version: 1.0.1" https://localhost:8081/playlists  | python -mjson.tool  

* Connected to localhost (::1) port 8081 (#0)
> GET /playlists HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/7.43.0
> Accept: */*
> Accept-Version: 1.0.1
>
< HTTP/1.1 400 Bad Request
< Content-Type: application/json
< Content-Length: 78
< Date: Thu, 03 Mar 2016 13:22:37 GMT
< Connection: keep-alive
<
{ [78 bytes data]
100    78  100    78    0     0   3542      0 --:--:-- --:--:-- --:--:--  3714
* Connection #0 to host localhost left intact
{
    "code": "InvalidVersion",
    "message": "1.0.1 is not supported by GET /playlists"
}
```




___
#### Example Ionic calls
The following code samples show how the Accept-Version header might be set for both
Ionic v1 and v2.


Ionic v1
```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'https://localhost:8081/account'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
}
```


<br/>
Ionic v2
```javascript
import {Http, Headers} from 'angular2/http';
...
this.header = new Headers();
this.header.set('jwt', jwt);
this.header.set('Accept-Version', '1.0.0');
this.header.set('Content-Type', 'application/json');
...

load = function(url:string) {
    return new Promise(resolve => {
        this.http.get(url, {headers:this.header})
        .subscribe(res => {
            resolve(res.json());
        }, error => {
            resolve(error);
        });
    });
}
```


___
<div style="margin:0 auto;text-align:center;">END</div>
