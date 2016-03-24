<div class="page-header">
  <h1  id="page-title">Database > Overview</h1>
</div>


The APIs use a MongoDB database with the WiredTiger engine. Currently the system does not
use a replica set implementation.  As such it is important to export the database on a regular basis.

Several indexes are required to operate the APIs for ID unique constraints and text searches. A TTL index
is also implemented on the LOGS collection to prevent collection growth.


See the __[Setup > MongoDB](/index.html?md=pages_setup_mongo.md)__ section to install a MongoDB database.

<br/><br/>

* __[Collections:](/index.html?md=pages_db_collections.md)__ describes the collections used in the MongoDB database

* __[Indexes:](/index.html?md=pages_db_indexes.md)__ create statements for the indexes required in the MongoDB database

___
<div style="margin:0 auto;text-align:center;">END</div>
