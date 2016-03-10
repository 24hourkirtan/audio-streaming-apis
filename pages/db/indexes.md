<div class="page-header">
  <h1  id="page-title">Database > Indexes</h1>
</div>

Create the following indexes manually for collections using the mongo CLI.


___
#### Text search on mp3s

Allows for text search on all keys in the mp3s collection.

```javascript
use kirtan

db.mp3s.createIndex( { "$**": "text" }, {name: "mp3s_text"} );

// Results
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```


___
#### Unique email on accounts

Email addresses as logins are unique.

```javascript
use kirtan

db.accounts.createIndex( { email: 1 }, { unique: true }, {name: "accounts_email"} );

// Results
{
	"createdCollectionAutomatically" : true,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```


___
#### Unique aid/name on playlists

The aid (\_id from accounts) and name is unique composite index.

```javascript
use kirtan

db.playlists.createIndex( { aid: 1, name:1 }, { unique: true }, {name: "playlists_aid_name"} );

// Results
{
	"createdCollectionAutomatically" : true,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```

___
