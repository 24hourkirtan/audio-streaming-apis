<div class="page-header">
  <h1  id="page-title">Endpoints > Jingles</h1>
</div>

The jingles collection holds all id3 information extracted from the available jingle files
on the file system. Records are read only and have been written to this collection by the Indexer.
Authentication is not required for all endpoints.

<table id="tbl">
  <colgroup>
    <col>
    <col>
    <col>
    <col>
  </colgroup>
  <tr>
    <th>Verb</th>
    <th>Endpoint</th>
    <th>Summary</th>
  </tr>
  <tr><td>GET</td><td><a href="#get.jingle.random">/jingle/random</a></td>
  <td>gets a random jingle record for an authenticated user</td></tr>

</table>





<a name="get.jingle.random"></a>
<!-- GET /jingle/random ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
___
## GET /jingle/random
Gets a random jingle record.

#### Parameters
* None


#### Inputs
* None

#### Returns

The image may be null if an ID3 tag for picture was missing
when the
__[Indexer](/index.html?md=pages_indexer.md)__
 ran last for the jingle returned.

```json
{
  "_id": "56f3e77237545bf3b7ab5d12",
  "album": "24 Hour Kirtan Radio Jingles",
  "artist": "Tarana Caitanya from Split/Croatia",
  "genre": "Kirtan",
  "image": {
    "data": null,
    "format": null
  },
  "orphaned": false,
    "path": "/_var/_media/jingles/Simply one has to become very sincere.mp3",
    "released": ISODate("2016-06-02T22:36:09.532Z"),
    "restricted": false,
    "dpath": "https://storage.googleapis.com/24hk-app/jingles/Simply one has to become very sincere.mp3",
    "stats": {
        "atime": "2016-05-14T19:29:11.000Z",
        "birthtime": "2016-03-22T13:28:22.000Z",
        "blksize": 4096,
        "blocks": 2440,
        "ctime": "2016-05-14T12:42:19.000Z",
        "dev": 16777219,
        "gid": 0,
        "ino": 77648942,
        "mode": 33261,
        "mtime": "2016-03-22T13:28:22.000Z",
        "nlink": 1,
        "rdev": 0,
        "size": 1246285,
        "uid": 501
    },
    "title": "Simply one has to become very sincere",
    "year": "2002"
}
```


#### Examples
Returns a single random jingle.
```bash
$ curl -v -k -X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/jingle/random" \
| python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'https://localhost:8081/jingle/random'})
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
