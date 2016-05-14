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
"_id" : ObjectId("56fa989f66db5ab7833b8440"),
"path" : "/var/media/aindra/10.02.10.mp3",
"title" : "Temple Kirtan 2010/02/10",
"artist" : "Aindra",
"album" : "Krishna Balaram Mandir",
"year" : null,
"genre" : "Kirtan",
"size" : 95450,
"orphaned" : false,
"restricted" : false,
"selfLink" : "https://storage.googleapis.com/24hk-app/aindra/10.02.10.mp3",
"stats" : {
  "dev" : 2049,
  "mode" : 33261,
  "nlink" : 1,
  "uid" : 0,
  "gid" : 0,
  "rdev" : 0,
  "blksize" : 4096,
  "ino" : 529979,
  "size" : 61260571,
  "blocks" : 119656,
  "atime" : ISODate("2016-05-14T07:08:13.738Z"),
  "mtime" : ISODate("2016-03-22T13:34:24.501Z"),
  "ctime" : ISODate("2016-03-22T13:34:24.517Z"),
  "birthtime" : ISODate("2016-03-22T13:34:24.517Z")
}
}
```
* __ _id:__ (Object ID) MongoDB system ID.
* __album:__ (string)
* __artist:__ (string)
* __genre:__ (string)
* __image:__ ({format, data}) The image content (data) and format of the picture.
* __orphaned:__ (boolean) false the mp3 file exists, true it is missing.
* __restricted:__ (boolean) MP3s marked as true require the user be authenticated.
* __path:__ (string) File system path to the mp3 file.
* __stats:__ (object) File system stats returned from Node.js fs.
* __title:__ (string)
* __year:__ (number)







___
#### jingles

```json
{
	"_id" : ObjectId("56fa98a266db5ab7833b84b3"),
	"path" : "/var/media/jingles/2-01 Madhava talk.mp3",
	"title" : "Radhadesh Mellows 2015 2/01",
	"artist" : "Madhava",
	"album" : "Radhadesh Mellows",
	"year" : "2015",
	"genre" : "Kirtan",
	"size" : 94135,
	"orphaned" : false,
	"restricted" : false,
	"selfLink" : "https://storage.googleapis.com/24hk-app/jingles/2-01 Madhava talk.mp3",
	"stats" : {
		"dev" : 2049,
		"mode" : 33261,
		"nlink" : 1,
		"uid" : 0,
		"gid" : 0,
		"rdev" : 0,
		"blksize" : 4096,
		"ino" : 402188,
		"size" : 3059984,
		"blocks" : 5984,
		"atime" : ISODate("2016-05-14T07:41:12.544Z"),
		"mtime" : ISODate("2016-03-22T13:28:18.231Z"),
		"ctime" : ISODate("2016-03-22T13:28:18.231Z"),
		"birthtime" : ISODate("2016-03-22T13:28:18.231Z")
	}
}
```
* __ _id:__ (Object ID) MongoDB system ID.
* __album:__ (string)
* __artist:__ (string)
* __genre:__ (string)
* __image:__ ({format, data}) The image content (data) and format of the picture.
* __orphaned:__ (boolean) false if the mp3 file exists, true it is missing.
* __path:__ (string) File system path to the mp3 file.
* __stats:__ (object) File system stats returned from Node.js fs.
* __title:__ (string)
* __year:__ (number)


___
#### logs
The LOGS collection has an TTL index on dttm set for seven days.

```json
{
  "_id" : ObjectId("56e71cebbf8b504546befd26"),
  "dttm" : ISODate("2016-03-14T20:19:55.265Z"),
  "msg" : "Indexer: All files finished for :/Users/warren//Downloads/mp3-id3-tag-samples",
  "data" : {
    "msg" : "ERROR: musicmetadata while parsing:",
    "file" : "/Users/warren/Downloads/_media/aindra/10.03.10_2.mp3",
    "err" : "Error: Could not read any data from this stream"
  }
}
```
* __ _id:__ (Object ID) MongoDB system ID.
* __dttm:__ (date) Date time of record creation (TTL seven days).
* __msg:__ (string) Message logged.
* __data:__ (object) Misc object normally used to hold error objects.



___
<div style="margin:0 auto;text-align:center;">END</div>
