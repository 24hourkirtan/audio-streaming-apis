<div class="page-header">
  <h1  id="page-title">Endpoints > Playlists</h1>
</div>

Each user can create multiple playlists containing unlimited MP3 files.

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
  <tr><td>GET</td><td><a href="#get.playlists">/playlists</a></td><td>gets all playlists for the current user, includes filtering/sort/paging options</td></tr>
  <tr><td>GET</td><td><a href="#get.playlist">/playlist/:\_id</a></td><td>gets a single playlist for the current user</td></tr>
  <tr><td>POST</td><td><a href="#post.playlist">/playlist</a></td><td>creates a playlist for the current user</td></tr>
  <tr><td>PATCH</td><td><a href="#patch.playlist">/playlist/:\_id</a></td><td>modify a playlist for the current user</td></tr>
  <tr><td>DELETE</td><td><a href="#delete.playlist">/playlist/:\_id</a></td><td>delete a playlist for the current user</td></tr>
</table>



<a name="get.playlists"></a>
<!-- GET /playlists ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
___
### GET /playlists

List all playlists owned by the current user identified by using the JWT token in the header.

<br/>
#### Parameters
* None

<br/>
#### Inputs
* None

<br/>
#### Returns
```bash
[
    {
        "_id": "56e2c5643f59a7751947ceda",
        "aid": "56e1d499a9689c1b09d8c4b5",
        "mp3": ["56e018fdbfdfb90c61e6028e",
                "56e018fdbfdfb90c61e6028c"
        ],
        "name": "my_playlist"
    }
]
```

<br/>
#### Examples
<br/>
```bash
curl -v -k -X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/playlists" \
| python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'PATCH',
        url:'https://localhost:8081/playlists'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```






<a name="get.playlist"></a>
<!-- GET /playlist/:\_id ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
### GET /playlist/:\_id
Gets a single playlist owned by the current user.

<br/>
#### Parameters
<table id="tbl">
  <colgroup>
    <col>
    <col>
    <col>
  </colgroup>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr><td>\_id</td><td>string</td><td>The unique \_id assigned to the playlist. Part of the URI.</td></tr>
</table>

##### Example Parameter
```bash
/playlist/56e2c5643f59a7751947ceda
```

<br/>
#### Inputs
* None

<br/>
#### Returns
```json
{
    "_id": "56e2c5643f59a7751947ceda",
    "aid": "56e1d499a9689c1b09d8c4b5",
    "mp3": ["56e018fdbfdfb90c61e6028e",
            "56e018fdbfdfb90c61e6028c"
    ],
    "name": "my_playlist"
}
```

#### Examples

```bash
curl -v -k -X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/playlist/56e2c5643f59a7751947ceda" \
| python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'https://localhost:8081/playlist/56e2c5643f59a7751947ceda'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```





<a name="post.playlist"></a>
<!-- POST /playlist ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
## POST /playlist

Create a new playlist for the current user.

<br/>
#### Parameters
* None

<br/>
#### Inputs
<table id="tbl">
  <colgroup><col><col><col></colgroup>
  <tr><th>Name</th><th>Type</th><th>Description</th></tr>
  <tr><td>name</td><td>string</td><td>The name of the playlist.</td></tr>
  <tr><td>mp3s</td><td>array&lt;string></td><td>Array of system \_id elements that represent MP3s.</td></tr>
</table>

##### Example Input
```json
{
  "name": "My Playlist",
  "mp3s": ["56e1e47847a5b1d9098e43fb","56e018fdbfdfb90c61e6028e"]
}
```

<br/>
#### Returns
```json
{
	"_id" : "56e1e47847a5b1d9098e43fb",
	"aid" : "56e1d499a9689c1b09d8c4b5",
	"name" : "My Playlist",
	"mp3s" : ["56e1e47847a5b1d9098e43fb","56e018fdbfdfb90c61e6028e"]
}
```

<br/>
#### Examples

<br/>
Create a new playlist.
```bash
curl -v -k -X POST \
-H "$(cat headers.txt)" \
-d '{"name":"My Playlist", "mp3s":["56e1e47847a5b1d9098e43fb","56e018fdbfdfb90c61e6028e"]}' \
"https://localhost:8081/playlist" | python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
var mp3s = ["56e1e47847a5b1d9098e43fb","56e018fdbfdfb90c61e6028e"];
$http({ method:'POST',
        url:'https://localhost:8081/playlist',
        data:{name:'My Playlist', mp3s:mp3s}})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```






<a name="patch.playlist"></a>
<!-- POST /playlist ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
## PATCH /playlist/:\_id

Modify a playlist for the current user.


<br/>
#### Parameters
<table id="tbl">
  <colgroup>
    <col>
    <col>
    <col>
  </colgroup>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr><td>\_id</td><td>string</td><td>The unique \_id assigned to the playlist. Part of the URI.</td></tr>
</table>

##### Example Parameter
```bash
/playlist/56e2c5643f59a7751947ceda
```


<br/>
#### Inputs
<table id="tbl">
  <colgroup><col><col><col></colgroup>
  <tr><th>Name</th><th>Type</th><th>Description</th></tr>
  <tr><td>name</td><td>string</td><td>The name of the playlist.</td></tr>
  <tr><td>mp3s</td><td>array&lt;string></td><td>Array of system \_id elements that represent MP3s.</td></tr>
</table>

##### Example Input
```json
{
  "name": "My Playlist",
  "mp3s": ["56e1e47847a5b1d9098e43fb","56e018fdbfdfb90c61e6028e"]
}
```


<br/>
#### Returns
```json
{
	"_id" : "56e1e47847a5b1d9098e43fb",
	"aid" : "56e1d499a9689c1b09d8c4b5",
	"name" : "My Playlist",
	"mp3s" : ["56e1e47847a5b1d9098e43fb","56e018fdbfdfb90c61e6028e"]
}
```

<br/>
#### Examples

<br/>
Create a new playlist.
```bash
curl -v -k -X PATCH \
-H "$(cat headers.txt)" \
-d '{"name":"My Playlist", "mp3s":["56e1e47847a5b1d9098e43fb","56e018fdbfdfb90c61e6028e"]}' \
"https://localhost:8081/playlist/56e1e47847a5b1d9098e43fb" | python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
var mp3s = ["56e1e47847a5b1d9098e43fb","56e018fdbfdfb90c61e6028e"];
$http({ method:'POST',
        url:'https://localhost:8081/palylist/56e1e47847a5b1d9098e43fb',
        data:{name:'My Playlist', mp3s:mp3s}})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```





<a name="delete.playlist"></a>
<!-- DELETE /playlist/:\_id ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
### DELETE /playlist/:\_id
Deletes a single playlist owned by the current user.

<br/>
#### Parameters
<table id="tbl">
  <colgroup>
    <col>
    <col>
    <col>
  </colgroup>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr><td>\_id</td><td>string</td><td>The unique \_id assigned to the playlist. Part of the URI.</td></tr>
</table>

##### Example Parameter
```bash
/playlist/56e2c5643f59a7751947ceda
```

<br/>
#### Inputs
* None


<br/>
#### Returns

* __n:__ Number of records deleted, should always be 1.
* __ok:__ 1 if the command executed properly.

```json
{
    "n": 1,
    "ok": 1
}
```

#### Examples

```bash
curl -v -k -X DELETE \
-H "$(cat headers.txt)" \
"https://localhost:8081/playlist/56e2c5643f59a7751947ceda" \
| python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'DELETE',
        url:'https://localhost:8081/playlist/56e2c5643f59a7751947ceda'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```





___
<div style="margin:0 auto;text-align:center;">END</div>
___
