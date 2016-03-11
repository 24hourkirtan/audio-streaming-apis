<div class="page-header">
  <h1  id="page-title">APIs > Playlists</h1>
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
  <tr><td>PATCH</td><td><a href="#patch.pswlaylist">/playlist/:\_id</a></td><td>update a playlist for the current user</td></tr>
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

#### Endpoint

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

<br/>
#### Parameters
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



<a name="get.playlist"></a>
<!-- GET /playlist/:\_id ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
### GET /playlist/:\_id
Gets a single playlist owned by the current user.

#### Endpoint

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

<br/>
#### Returns
```bash
{
    "_id": "56e2c5643f59a7751947ceda",
    "aid": "56e1d499a9689c1b09d8c4b5",
    "mp3": ["56e018fdbfdfb90c61e6028e",
            "56e018fdbfdfb90c61e6028c"
    ],
    "name": "my_playlist"
}
```



___
<div style="margin:0 auto;text-align:center;">END</div>
___
