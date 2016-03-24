<div class="page-header">
  <h1  id="page-title">Endpoints > Jingles</h1>
</div>

The jingles collection holds all id3 information extracted from the available jinlge files
on the fie system. Records are read only and have been written to this collection by the Indexer.

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
  <tr><td>GET</td><td><a href="#get.jingle.random">/jingle/random</a></td><td>gets a random jingle record for an authenticated user</td></tr>

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
  "path": "/Users/warren/Downloads/_media/jingles/160130-133452-edit.mp3",
  "size": 10405,
  "title": "Radhadesh Mellows 2016",
  "year": null
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
