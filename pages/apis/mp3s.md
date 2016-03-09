<div class="page-header">
  <h1  id="page-title">APIs > MP3s</h1>
</div>

The mp3s collection holds all id3 information extracted from the available mp3 files
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
  <tr><td>GET</td><td>/mp3s</td><td>list of available mp3 files</td></tr>
  <tr><td>GET</td><td>/mp3s/:id</td><td>a single mp3 file by id</td></tr>
</table>


<br/>
___
### GET /mp3s

List all mp3 records using the JWT token in the header.

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
  <tr><td>q</td><td>string</td><td>Search keywords.</td></tr>
  <tr><td>limit</td><td>string</td><td>Number of records to return. Default: 10.</td></tr>
  <tr><td>skip</td><td>string</td><td>Number of records to skip over before starting the limit count. Default: 0.</td></tr>
  <tr><td>sort</td><td>string</td><td>The sort field. One of title, album, or artist. Default: title.</td></tr>
  <tr><td>order</td><td>string</td><td>The sort order if sort parameter is provided. One of asc or desc. Default: desc.</td></tr>
  <tr><td>image</td><td>string</td><td>Used to exclude or include the image data for the mp3 file. Default: true.</td></tr>
</table>


<br/>
#### Returns
```bash
{
    "_collectionCnt": 12,
    "_limit": 2,
    "_remainingCnt": 5,
    "_returnedCnt": 2,
    "_skip": 5,
    "data": [
        {
            "_id": "56debc54bfdfb90c61e6027e",
            "album": "Canberra",
            "artist": "Amala Kirtan",
            "genre": "Kirtan",
            "path": "/Users/warren/Downloads/mp3-id3-tag-samples/worldwide-old/2012/2012-canberra-24-hour-kirtan/14-Amala Kirtan Das.mp3",
            "size": 508587,
            "title": "Canberra 24 Hour Kirtan 2012 Track 14",
            "year": "2012"
        },
        {
            "_id": "56debc54bfdfb90c61e6027f",
            "album": "Bhakti Fest",
            "artist": "Prema Hara",
            "genre": "Kirtan",
            "path": "/Users/warren/Downloads/mp3-id3-tag-samples/worldwide-old/2012/2012-bhakti-fest/prema-hara-maha-mantra.mp3",
            "size": 239654,
            "title": "Bhakti Fest Maha Mantra Kirtan 09/2012",
            "year": "2012"
        }
    ]
}
```


<br/>
#### Examples

<br/>
Return mp3s, limit of 10 records, skipping 0 records, sorting by key title in desc order.
```bash
curl -v -k -H "$(cat headers.txt)" "https://localhost:8081/mp3s" | python -mjson.tool

// excludes image data
curl -v -k -H "$(cat headers.txt)" "https://localhost:8081/mp3s?image=false" | python -mjson.tool
```

<br/>
Return all mp3s with the search word hour, limit of 4 records, skipping 0 records, sorting by key album in desc order, no image data.
```bash
curl -v -k -H "$(cat headers.txt)" "https://localhost:8081/mp3s?q=2012&limit=4&skip=0&sort=album&order=desc&image=false" | python -mjson.tool
```




<br/>
___
### GET /mp3s/:id

Gets a specific mp3 record using the id.

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
  <tr><td>image</td><td>string</td><td>Used to exclude or include the image data for the mp3 file. Default: true.</td></tr>
</table>

<br/>
#### Returns
```bash
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
```


<br/>
#### Examples

<br/>
Return a single mp3 record with image data.
```bash
curl -v -k -H "$(cat headers.txt)" "https://localhost:8081/mp3s/56e018fdbfdfb90c61e60285" | python -mjson.tool

// excludes image data
curl -v -k -H "$(cat headers.txt)" "https://localhost:8081/mp3s/56e018fdbfdfb90c61e60285?image=false" | python -mjson.tool
```





___
