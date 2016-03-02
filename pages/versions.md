<div class="page-header">
  <h1  id="page-title">Versions</h1>
</div>

Currently there is one version of the API: the v1.0.0 version.
By default, all requests receive the v1.0.0 version  
however it is best to request a specific version via the Accept header.  This would allow
for an easier migration path to future releases.

<pre style="margin-left:30px"><code class="language-bash line-numbers">// BASH
curl -v --header "Accept-Version: 1.0.0" https://localhost:8081/playlists  | python -m json.tool  

* Connected to localhost (::1) port 8081 (#0)
> GET /playlists HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/7.43.0
> Accept: */*
> Accept-Version: 1.0.0
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Content-Length: 184
< Date: Wed, 02 Mar 2016 12:04:58 GMT
< Connection: keep-alive
<
{ [184 bytes data]
100   184  100   184    0     0  27255      0 --:--:-- --:--:-- --:--:-- 30666
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

</code></pre>




___
#### Example Ionic calls
The following code samples show how the Accept-Version header might be set for both
Ionic v1 and v2.

<br/>
Ionic v1
<pre style="margin-left:30px;"><code class="language-javascript line-numbers">// Javascript
var version = '1.0.0';

load = function(url) {
    $http({ method: 'POST', url: url,
        data: {"key":value},
        timeout:10000,
        headers:{"jwt": "23423423f23r23", "Accept-Version": version}
    })
    .success(function (data, status, headers, config) {
        ...
    })
    .error(function (err, code, status, headers, config) {
        ...
    });
}
</code></pre>


<br/>
Ionic v2
<pre style="margin-left:30px;"><code class="language-javascript line-numbers">// Javascript
import {Http, Headers} from 'angular2/http';
...

this.header = new Headers();
this.header.set('jwt', "23423423f23r23");
this.header.set('Accept-Version', '1.0.0');

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
</code></pre>


___
