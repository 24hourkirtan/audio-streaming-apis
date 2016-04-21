<div class="page-header">
  <h1  id="page-title">Endpoints > Utils</h1>
</div>

Authentication is not required for all endpoints.

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
  <tr><td>GET</td><td><a href="#get.ping">/ping</a></td><td>simple endpoint to verify the API server is alive</td></tr>
  <tr><td>GET</td><td><a href="#get.license">/license</a></td><td>retrieves API the license type</td></tr>
  <tr><td>GET</td><td><a href="#get.id3">/id3</a></td><td>retrieves the id3 tags for a specified path of an MP3 file</td></tr>
</table>




<a name="get.ping"></a>
<!-- GET /ping ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
___
## GET /ping
Simple endpoint to verifiy the API server is alive.

#### Parameters
* None

#### Inputs
* None



#### Returns
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
{
    "answer": "hello",
    "version": "1.0.0"
}
```

#### Examples
```bash
$ curl -v -k -H "Accept-Version: 1.0.0" https://localhost:8081/ping
```


<a name="get.license"></a>
<!-- GET /license ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
___
## GET /license
Retrieves the license type.

#### Parameters
* None

#### Inputs
* None


#### Returns
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
{
    "license": "GNU GENERAL PUBLIC LICENSE",
    "version": "1.0.0"
}
```

#### Examples
```bash
curl -v _H "Accept-Version: 1.0.0" http://localhost:8081/license
```



<a name="get.id3"></a>
<!-- GET /ids ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
___
## GET /id3
Retrieves the id3 tags for a specified path of an MP3 file.

#### Parameters
* None

#### Inputs
<table id="tbl">
  <colgroup><col><col><col></colgroup>
  <tr><th>Name</th><th>Type</th><th>Description</th></tr>
  <tr><td>path</td><td>string</td><td>The path to the MP3 file.</td></tr>
</table>

##### Example Input
```json
{
  "path": "/var/media/aindra/10.03.11-janma-tithi-kirtan-1.mp3"
}
```


#### Returns
```bash
{
"developer-msg": "The tags key represents the acutal ID3 parser results",
"path": "/var/media/aindra/10.03.11-janma-tithi-kirtan-1.mp3",
"tags": {
  "album": "Krishna Balaram Mandir",
  "albumartist": [],
  "artist": [
    "Aindra"
  ],
  "disk": {
    "no": 0,
    "of": 0
  },
  "duration": 0,
  "genre": [
    "Kirtan"
  ],
  "picture": [],
  "title": "Janma Tithi Kirtan Part 1",
  "track": {
    "no": 14,
    "of": 0
  },
  "year": "2010"
}
}
```

#### Examples
```bash
$curl -G  -v -k "https://localhost:8081/id3" \
--data-urlencode \
"path=/var/media/aindra/10.03.11-janma-tithi-kirtan-1.mp3" \
| python -mjson.tool
```


___
<div style="margin:0 auto;text-align:center;">END</div>
