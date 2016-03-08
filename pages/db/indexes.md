<div class="page-header">
  <h1  id="page-title">Database > Indexes</h1>
</div>

Create the following indexes manually for collections using the mongo CLI.


___
#### Text search on mp3s

Allows for text search on all keys in the mp3s collection.

```javascript
use kirtan

db.mp3s.createIndex( { "$**": "text" } );

// Results
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```



___
