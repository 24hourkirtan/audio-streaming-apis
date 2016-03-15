<div class="page-header">
  <h1  id="page-title">Endpoints > Logs</h1>
</div>

The logs collection holds logging record mostly created by the endpoints for errors.
The Indexer also logs information related to the completion of the indexing process. The LOGS
collection is set as TTL on the DTTM key. All records auto delete after seven days.

<table id="tbl">
  <colgroup><col><col><col></colgroup>
  <tr>
    <th>Verb</th>
    <th>Endpoint</th>
    <th>Summary</th>
  </tr>
  <tr><td>GET</td><td><a href="#get.logs">/logs</a></td><td>gets a list of log records for an authenticated user, includes sort and paging options</td></tr>

</table>





<a name="get.logs"></a>
<!-- GET /mp3s ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
___
## GET /logs
List all log records using the JWT token in the header. Use of sort and paging options can alter the returned
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
  <tr><td>limit</td><td>string</td><td>Number of records to return. Default: 10.</td></tr>
  <tr><td>skip</td><td>string</td><td>Number of records to skip over before starting the limit count. Default: 0.</td></tr>
  <tr><td>sort</td><td>string</td><td>The sort field. One of dttm or msg. Default: dttm.</td></tr>
  <tr><td>order</td><td>string</td><td>The sort order if sort parameter is provided. One of asc or desc. Default: desc.</td></tr>
</table>

##### Example Parameter
```bash
/logs?sort=dttm
```

#### Inputs
* None

#### Returns

* __\_next:__ Pre-formed url to get the next batch of record. If null then the current position is at the start of the data set.
* __\_prev:__ Pre-formed url to get the previous batch of record. If null then the current position is at the end of the data set.
* __\_remainingCnt:__ The total number of records available after the current data set (next total).
* __\_totalCnt:__ The total number of records found by the request but not necessarily returned.
* __logs:__ The data set.
* ...

```json
{{
    "_limit": 10,
    "_next": "/logs?limit=10&skip=20&sort=dttm&order=desc",
    "_order": "desc",
    "_prev": "/logs?limit=10&skip=0&sort=dttm&order=desc",
    "_remainingCnt": 30,
    "_returnedCnt": 10,
    "_skip": 10,
    "_sort": "dttm",
    "_totalCnt": 50,
    "mp3s": [
        {
            "_id": "56e72a23ea39b14447cada6f",
            "dttm": "2016-03-14T21:16:19.316Z",
            "msg": "Indexer: All files finished for :/Users/warren//Downloads/mp3-id3-tag-samples"
        },
        {
            "_id": "56e72a2abdc10f4a47aab88e",
            "dttm": "2016-03-14T21:16:26.042Z",
            "msg": "Database started (db.js)"
        },
        {
            "_id": "56e72a38bdc10f4a47aab88f",
            "dttm": "2016-03-14T21:16:40.856Z",
            "msg": "Indexer: All files finished for :/Users/warren//Downloads/mp3-id3-tag-samples"
        },
        ...

    ]
}
```

#### Examples
Return logs, limit of 10 records, skipping 0 records, sorting by dttm in desc order (uses all default parameters).
```bash
curl -v -k -X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/logs" \
| python -mjson.tool

```
```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'https://localhost:8081/logs'})
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
Return all logs, limit of 4 records, skipping 0 records, sorting by "msg" in desc order.
```bash
curl -v -k -X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/mp3s?limit=4&skip=0&sort=msg&order=desc" \
| python -mjson.tool
```
```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'localhost:8081/mp3s?limit=4&skip=0&sort=msg&order=desc'})
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
