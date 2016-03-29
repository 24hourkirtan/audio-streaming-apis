<div class="page-header">
  <h1  id="page-title">Database > Collections</h1>
</div>

Data is stored into five MongoDB collections. Each collections has a minimum set of key/value pairs
 as defined below.


___
#### accounts

```json
{
  "_id": ObjectId("23423r23f2-232f-2f2f2ff"),
  "email": "user@domina.com",
  "pswd": "34jj23j4ij23j44",
  "type": "local"
}
```
* __ _id:__ (Object ID) MongoDB system ID.
* __email:__ (string) User email address used as login ID.
* __pswd:__ (base64 encoded string)
The pswd is never returned to any client via any endpoint. It is only for internal API use.
* __type:__ (string) Identifies the type of login the account utilizes. Either local or fb (Facebook).


___
#### playlists

```json
{
  "_id": ObjectId("eru845j99jj-35g4-34ut86"),
  "aid": ObjectId("23423r23f2-232f-2f2f2ff"),
  "name": "Monday After Work",
  "mp3s": [ObjectId("934834u3j34j-4343-ffd89fud"), ObjectId("9234923423i4j-4234-dfsdfn")]
}
```
* __ _id:__ (Object ID) MongoDB system ID.
* __aid:__ (Object ID) MongoDB system ID of the owner from the accounts collection.
* __name:__ (string) User defined name of a playlist.
The pswd is never returned to any client via any endpoint. It is only for internal API use.
* __mp3s:__ (array) List of system IDs from the mp3s collection.



___
#### mp3s

```json
  {
  "_id": "56f3e37737545bf3b7ab5d01",
  "album": "Live Kirtans 2010",
  "artist": "Aindra Prabhu",
  "genre": "Spiritual",
  "image": {
    "format": "image.jpeg",
    "data": "..."
  },
  "orphaned": false,
  "path": "/Users/warren/Downloads/_media/aindra/10.02.28-gaura-purnima.mp3",
  "size": 12278,
  "title": "Gaura Purnima Kirtan 02/28/2010 - Track 4",
  "year": "2010"
  }
```
* __ _id:__ (Object ID) MongoDB system ID
* __album:__ (string)
* __artist:__ (string)
* __genre:__ (string)
* __image:__ ({format, data}) The image content (data) and format of the picture
* __orphaned:__ (boolean) false the mp3 file exists, true it is missing
* __path:__ (string) File system path to the mp3 file
* __size:__ (number)
* __title:__ (string)
* __year:__ (number)







___
#### jingles

```json
{
  "_id" : ObjectId("56f3e77237545bf3b7ab5d11"),
  "album": "24 Hour Kirtan Radio Jingles",
  "artist" : "Guru Charana Padma",
  "genre" : "Kirtan",
  "image" : {
    "format" : "image/jpeg",
    "data": "..."
  },
  "orphaned":false,
  "path" : "//Users/warren/Downloads/_media/jingles/160130-133013-edit.mp3",
  "title" : "Radhadesh Mellows 2016",
  "size" : 10389,
  "year" : null
}
```
* __ _id:__ (Object ID) MongoDB system ID
* __album:__ (string)
* __artist:__ (string)
* __genre:__ (string)
* __image:__ ({format, data}) The image content (data) and format of the picture
* __orphaned:__ (boolean) false the mp3 file exists, true it is missing
* __path:__ (string) File system path to the mp3 file
* __size:__ (number)
* __title:__ (string)
* __year:__ (number)


___
#### logs
The LOGS collection has an TTL index on dttm set for seven days.

```json
{
  "_id" : ObjectId("56e71cebbf8b504546befd26"),
  "dttm" : ISODate("2016-03-14T20:19:55.265Z"),
  "msg" : "Indexer: All files finished for :/Users/warren//Downloads/mp3-id3-tag-samples"
}
```
* __ _id:__ (Object ID) MongoDB system ID.
* __dttm:__ (date) Date time of record creation (TTL seven days).
* __msg:__ (string) Message loggd



___
<div style="margin:0 auto;text-align:center;">END</div>