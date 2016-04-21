<div class="page-header">
  <h1  id="page-title">Database > Indexes</h1>
</div>

Create the following indexes manually for collections using the mongo CLI.


___
#### Unique email on ACCOUNTS

Email addresses as logins are unique.

```javascript
> use kirtan

> db.accounts.createIndex( { email: 1 }, { unique: true, name: "accounts_email"} );

// Results
{
	"createdCollectionAutomatically" : true,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```

___
#### Text search on MP3S

Allows for text search on all keys in the mp3s collection.

```javascript
> use kirtan

> db.mp3s.createIndex( { "$**": "text" }, {name: "mp3s_text"} );

// Results
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```


___
#### Orphans on MP3S

Queries to GET /mp3s filter on "orphaned". This index provides query optimization.
Only mp3s that are not orphaned are returned. The orphaned
key is not considered for queries to GET /mp3/:\_id, the client must handle orphaned records received.

```javascript
> use kirtan

> db.mp3s.createIndex( { orphaned: 1 }, {name: "mp3s_orphaned"} );

// Results
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 2,
	"numIndexesAfter" : 3,
	"ok" : 1
}
```

___
#### Restricted on MP3S

Indexes the restricted key which is used to filter requests for non-authenticated users.

```javascript
> use kirtan

> db.mp3s.createIndex( { restricted: 1 }, {name: "mp3s_restricted"} );

// Results
{
  "createdCollectionAutomatically" : false,
  "numIndexesBefore" : 3,
  "numIndexesAfter" : 4,
  "ok" : 1
}
```

___
#### Orphans on JINGLES

Queries to GET /jingles/random filter on "orphaned". This index provides query optimization.
Only jingles that are not orphaned are returned.

```javascript
> use kirtan

> db.jingles.createIndex( { orphaned: 1 }, {name: "jingles_orphaned"} );

// Results
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 2,
	"numIndexesAfter" : 3,
	"ok" : 1
}
```



___
#### Unique aid/name on PLAYLISTS

The aid (\_id from accounts) and name is unique composite index.

```javascript
> use kirtan

> db.playlists.createIndex( { aid: 1, name:1 }, { unique: true, name: "playlists_aid_name"} );

// Results
{
	"createdCollectionAutomatically" : true,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```



___
#### TTL index on LOGS
This (time-to-live) index purges log records after seven days to prevent excessive collection growth.

```javascript
> use kirtan

> db.logs.createIndex( { "dttm": 1 }, { expireAfterSeconds: 604800, name: "logs_ttl_dttm"} );

// Results
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```





___
<div style="margin:0 auto;text-align:center;">END</div>
