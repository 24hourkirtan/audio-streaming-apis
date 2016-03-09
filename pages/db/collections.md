<div class="page-header">
  <h1  id="page-title">Database > Collections</h1>
</div>

Data is stored into three MongoDB collections. Each collections has a minimum set of key/value pairs
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
* __type:__ (string) Identifies the type of login the account utilizes. Either local or fb (facebook).


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
  	"_id" : ObjectId("56deb474bfdfb90c61e6025c"),
  	"path" : "/Users/warren/Downloads/mp3-id3-tag-samples/worldwide-old/2012/2012-canberra-24-hour-kirtan/14-Amala Kirtan Das.mp3",
  	"title" : "Canberra 24 Hour Kirtan 2012 Track 14",
  	"artist" : "Amala Kirtan",
  	"year" : "2012",
  	"genre" : "Kirtan",
  	"size" : 508587,
  	"image" : {
    		"format" : "image/jpeg",
            "data": "..."
  	}
}
```
* __ _id:__ (Object ID) MongoDB system ID.
* __path:__ (string) File system path to the mp3 file.
* __title:__ (string)
* __artist:__ (string)
* __year:__ (number)
* __genre:__ (string)
* __size:__ (number)
* __image:__ ({format, data}) The image content (data) and format of the picture.








___
