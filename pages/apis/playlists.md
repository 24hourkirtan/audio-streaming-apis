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
  <tr><td>GET</td><td>/playlists</td><td>gets all playlists for the current user, includes filtering/sort/paging options</td></tr>
  <tr><td>GET</td><td>/playlist/:\_id</td><td>gets a single playlist for the current user</td></tr>
  <tr><td>POST</td><td>/playlist</td><td>creates a playlist for the current user</td></tr>
  <tr><td>PATCH</td><td>/playlist</td><td>update a playlist for the current user</td></tr>
  <tr><td>DELETE</td><td>/playlist/:\_id</td><td>delete a playlist for the current user</td></tr>
</table>



___
### GET /playlists

List all playlists owned by the current user identified by using the JWT token in the header.

#### Endpoint

```bash
GET /playlists

curl -v -k -H "$(cat headers.txt)" https://localhost:8081/playlists | python -mjson.tool

// Ionic v1
var version = '1.0.0', token = localstorage.get('jwt');
$http({ method: 'GET', url: '/playlists',
        timeout:10000,
        headers:{"jwt": token, "Accept-Version": version}
    })
```


#### Parameters
* None



#### Returns
```bash
[
    {
        "_id": "23423r23f2-232f-2f2f2ff",
        "mp3": [
            {
                "_id": "1212312-d123d23d23-d3d233"
            },
            {
                "_id": "7897789-34f234t23t-r34r3434v34"
            }
        ],
        "name": "my_playlist",
        "owner_id": "123412e123e-2d223d32-d23d2f23f"
    }
]
```

___
