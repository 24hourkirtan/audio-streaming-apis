<div class="page-header">
  <h1  id="page-title">Endpoints > MP3s</h1>
</div>

The mp3s collection holds all id3 information extracted from the available mp3 files
on the fie system. Records are read only and have been written to this collection by the Indexer. All endpoints
can be accessed with or without authentication. Without authentication restricted MP3s are filtered out.

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
    <th>JWT</th>
    <th>Summary</th>
  </tr>
  <tr><td>GET</td><td><a href="#get.mp3s">/mp3s</a></td>
    <td>X <sup>1</sup></td>
    <td>gets a list of mp3 records for an authenticated user, includes filtering/sort/paging options</td></tr>
  <tr><td>GET</td><td><a href="#get.mp3s.distinctkey">/mp3s/distinctkey/:key</a></td>
    <td>X <sup>1</sup></td>
    <td>gets a distinct list of key values</td></tr>
  <tr><td>GET</td><td><a href="#get.mp3s.key">/mp3s/key/:key</a></td>
    <td>X <sup>1</sup></td>
    <td>gets mp3 records using a declared key/value pair with optional parameters</td></tr>
  <tr><td>GET</td><td><a href="#get.mp3">/mp3/:\_id</a></td>
    <td>X <sup>1</sup></td>
    <td>gets a single mp3 record for an authenticated user</td></tr>
</table>

<br/>
<sup>1</sup> Can be accessed with or without authentication.



> <span style="font-size:small;color:red;">When accessing MP3 endpoints without authentication records
marked as restricted are not included.</span>  

<a name="get.mp3s"></a>
<!-- GET /mp3s ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
___
## GET /mp3s
List all mp3 records using the JWT token in the header. Use of query, filter, and sort options can alter the returned
data set.

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
  <tr><td>q</td><td>string</td><td>Search keywords.</td></tr>
  <tr><td>limit</td><td>string</td><td>Number of records to return. Default: 10.</td></tr>
  <tr><td>skip</td><td>string</td><td>Number of records to skip over before starting the limit count. Default: 0.</td></tr>
  <tr><td>sort</td><td>string</td><td>The sort field. One of title, album, or artist. Default: title.</td></tr>
  <tr><td>order</td><td>string</td><td>The sort order if sort parameter is provided. One of asc or desc. Default: desc.</td></tr>
  <tr><td>image</td><td>string</td><td>Used to exclude or include the image data for the mp3 file. Default: true.</td></tr>
</table>

##### Example Parameter
```bash
/mp3s?sort=name&image=false
```

#### Inputs
* None

#### Returns

* __\_next:__ Pre-formed url to get the next batch of record. If null then the current position is at the start of the data set.
* __\_prev:__ Pre-formed url to get the previous batch of record. If null then the current position is at the end of the data set.
* __\_remainingCnt:__ The total number of records available after the current data set (next total).
* __\_totalCnt:__ The total number of records found by the request but not necessarily returned.
* __mp3s:__ The data set.
* ...

```json
{
    "_limit": 2,
    "_next": "/mp3s?q=&limit=2&skip=8&sort=title&order=desc&image=false",
    "_order": 1,
    "_prev": "/mp3s?q=&limit=2&skip=4&sort=title&order=desc&image=false",
    "_q": "",
    "_remainingCnt": 4,
    "_returnedCnt": 2,
    "_skip": 6,
    "_sort": "title",
    "_totalCnt": 12,
    "mp3s": [
        {
            "_id": "56e018fdbfdfb90c61e60288",
            "album": "Akhanda Nam II",
            "artist": "Govinda",
            "genre": "Kirtan",
            "image": {
                "format": "image/jpeg"
            },
            "path": "/Users/warren/Downloads/mp3-id3-tag-samples/studio/govinda-prabhu/akhanda-nam-2/Track # 1-Khamaj-Master-2 (master).mp3",
            "size": 124181,
            "title": "Khamaj",
            "year": "2010"
        },
        {
            "_id": "56e018fdbfdfb90c61e60285",
            "album": "Akhanda Nam I",
            "artist": "Govinda",
            "genre": "Kirtan",
            "image": {
                "format": "image/jpeg"
            },
            "path": "/Users/warren/Downloads/mp3-id3-tag-samples/studio/govinda-prabhu/akhanda-nam/01 Madhukosh 4.01.mp3",
            "size": 181526,
            "title": "Madhukosh",
            "year": "2011"
        }
    ]
}
```


#### Examples
Return mp3s, limit of 10 records, skipping 0 records, sorting by title in desc order (uses all default parameters).
```bash
$ curl -v -k -X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/mp3s" \
| python -mjson.tool

// excludes image data
curl -v -k -H "$(cat headers.txt)" \
"https://localhost:8081/mp3s?image=false" \
| python -mjson.tool
```
```javascript
$http.defaults.headers.common['jwt'] = jwt; // optional authentication
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'https://localhost:8081/mp3s'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```

Return all mp3s with the search word "2012", limit of 4 records, skipping 0 records, sorting by "album" in desc order, no image data.
```bash
$ curl -v -k -X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/mp3s?q=2012&limit=4&skip=0&sort=album&order=desc&image=false" \
| python -mjson.tool
```
```javascript
$http.defaults.headers.common['jwt'] = jwt; // optional authentication
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'localhost:8081/mp3s?q=2012&limit=4&skip=0&sort=album&order=desc&image=false'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```




<a name="get.mp3s.distinctkey"></a>
<!-- GET /mp3/distinctkey/:key ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
___
## GET /mp3s/distinctkey/:key
Gets a distinct list of key values from the MP3s collection. Any key can be queried.
A valid key would return a distinct list of the key values including nulls. The list is not sorted.
An invalid key returns no results.

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
  <tr><td>key</td><td>string</td><td>The key for which its values would be returned. Part of the URI.</td></tr>
</table>

##### Example Parameter
```bash
/mp3s/distinctkey/artist
```

#### Inputs
* None

#### Returns
```json
[
    "Aindra",
    "Govinda",
    "Aindra Prabhu",
    "Rucira",
    "Kalindi",
    "Prema Hara",
    "Mayapuris",
    "Shyamananda Kirtan Mandali",
    "Amala Kirtan"
]
```


#### Examples
Return a distinct list of artists. Authentication is not required.
```bash
$ curl -v -k - X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/mp3s/distinctkey/artist" \
| python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt; // optional authentication
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'https://localhost:8081/mp3s/distinctkey/artist'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```




<a name="get.mp3s.key"></a>
<!-- GET /mp3/key/:key ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
___
## GET /mp3s/key/:key
Gets a list of mp3 records using a search declared using a key/value pair with optional parameters.
Any key can be searched. The list can be sorted. An invalid key returns no results.

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
  <tr><td>key</td><td>string</td><td>The key to search against. Part of the URI.</td></tr>
  <tr><td>q</td><td>string</td><td>Text to search for against the declared key. Defaults: ?: (everything)</td></tr>
  <tr><td>operator</td><td>string</td><td>Type of search operation (equals, contains, beginswith, endswidth). Default: equals.</td></tr>
  <tr><td>limit</td><td>string</td><td>Number of records to return. Default: 10.</td></tr>
  <tr><td>skip</td><td>string</td><td>Number of records to skip over before starting the limit count. Default: 0.</td></tr>
  <tr><td>sort</td><td>string</td><td>The key to sort by, can be different than the searchable key. Defaults: [key].</td></tr>
  <tr><td>order</td><td>string</td><td>Defines the sort order (asc or desc). Default: desc.</td></tr>
  <tr><td>image</td><td>string</td><td>Used to exclude or include the image data for the mp3 file. Default: true.</td></tr>
</table>

##### Example Parameters
```bash
/mp3s/key/artist
/mp3s/key/artist?q=bala&operator=contains
/mp3s/key/artist?q=bala&operator=contains&sort=title
/mp3s/key/artist?q=bala&operator=contains&sort=title&order=asc
/mp3s/key/artist?q=bala&operator=contains&sort=title&order=asc&image=false
/mp3s/key/artist?q=bala&operator=contains&sort=title&order=asc&image=false&limit=4&skip=4
```

#### Inputs
* None

#### Returns


```json
# will be udpated when pagination is added
{
    "_key": "artist",
    "_limit": 2,
    "_next": "/mp3s/key/artist?q=Aindra&operator=equals&limit=2&skip=4&sort=year&order=desc&image=false",
    "_operator": "equals",
    "_order": "desc",
    "_prev": "/mp3s/key/artist?q=Aindra&operator=equals&limit=2&skip=0&sort=year&order=desc&image=false",
    "_q": "Aindra",
    "_remainingCnt": 1,
    "_returnedCnt": 2,
    "_skip": 2,
    "_sort": "year",
    "_totalCnt": 5,
    "mp3s": [
        {
            "_id": "56f9620c37545bf3b7ab5e3c",
            "album": "Krishna Balaram Mandir",
            "artist": "Aindra",
            "genre": "Kirtan",
            "image": {
                "format": "image/png"
            },
            "orphaned": false,
            "path": "/Users/warren/Downloads/_media/aindra/10.02.28-gaura-purnima-3.mp3",
            "restricted": false,
            "size": 95450,
            "title": "Gaura Purnima Kirtan 02/28/2010 - Track 3",
            "year": "2010"
        },
        {
            "_id": "56f9620c37545bf3b7ab5e3e",
            "album": "Krishna Balaram Mandir",
            "artist": "Aindra",
            "genre": "Kirtan",
            "image": {
                "format": "image/png"
            },
            "orphaned": false,
            "path": "/Users/warren/Downloads/_media/aindra/10.03.05_2.mp3",
            "restricted": false,
            "size": 95450,
            "title": "Temple Kirtan 2010/03/05 Part 2",
            "year": "2010"
        }
    ]
}
```


#### Examples
Returns a search based on the artist key, no image, sorted by year, limit of 2 and skips the first 2 records.
```bash
$ curl -v -k - X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/mp3s/key/artist?q=Aindra&image=false&sort=year&limit=2&skip=2" \
| python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt; // optional authentication
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'https://localhost:8081/mp3s/key/artist?q=Aindra&image=false&sort=year&limit=2&skip=2'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```




<a name="get.mp3"></a>
<!-- GET /mp3 ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
___
## GET /mp3/:\_id
Gets a specific mp3 record using the \_id.

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
  <tr><td>\_id</td><td>string</td><td>The unique \_id assigned to the mp3. Part of the URI.</td></tr>
  <tr><td>image</td><td>string</td><td>Used to exclude or include the image data for the mp3 file. Default: true.</td></tr>
</table>

##### Example Parameter
```bash
/mp3/56e018fdbfdfb90c61e60285
```

#### Inputs
* None

#### Returns
```json
{
    "_id": "56e018fdbfdfb90c61e60285",
    "album": "Akhanda Nam I",
    "artist": "Govinda",
    "genre": "Kirtan",
    "image": {
        "format": "image/jpeg",
        "data": "234j34ufufdsu9u...",
    },
    "path": "/Users/warren/Downloads/mp3-id3-tag-samples/studio/govinda-prabhu/akhanda-nam/01 Madhukosh 4.01.mp3",
    "restricted":false,
    "size": 181526,
    "title": "Madhukosh",
    "year": "2011"
}
```


#### Examples
Return a single mp3 record with image data.
```bash
$ curl -v -k - X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/mp3/56e018fdbfdfb90c61e60285" \
| python -mjson.tool

// excludes image data
$ curl -v -k -X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/mp3/56e018fdbfdfb90c61e60285?image=false" \
| python -mjson.tool
```
```javascript
$http.defaults.headers.common['jwt'] = jwt; // optional authentication
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'https://localhost:8081/mp3/56e018fdbfdfb90c61e60285?image=false'})
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
