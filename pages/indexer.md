<div class="page-header">
  <h1  id="page-title">MP3 Indexer</h1>
</div>

The MP3 indexer runs on a regular basis to gather ID3 tag information from MP3 files
in the file system and imports the information  
into the database that the APIs use. The indexer runs once every 12 hours and reviews all ID3
tags in the file system. The review performs the following CRUD operations.

* New ID3 tag are inserted using an UPSERT command
* ID3 tags that no longer exist are tagged as orphaned for administrative review and removal
* ID3 tags that have changed are updated using and UPSERT command

The indexer is a simple self contain module that is run by an interval timer. It recursively reads
the file system and validates the ID3 tag information in the database.



___
### Deleted tags
Tags that have been removed from the file system are not deleted from the database but rather marked as
orphaned. This is to prevent accidental deletions due to any possible code errors. Orphaned ID3 tags will
be re-activated if they are added back into the file system.
