<div class="page-header">
  <h1  id="page-title">MP3 Indexer</h1>
</div>

The Indexer is a simple self contained module that is run by an interval timer set
in the server.js file. The Indexer gathers ID3 tag information from MP3 files (both for songs and jingles)
located on the file system. It imports the information into the database as metadata. The Indexer runs once every 12 or 13 hours and reviews all ID3 tags in the MP3 files. The review performs the following CRUD operations.

* New MP3 files are inserted using an UPSERT command if they do not exists in the database

* New MP3 files (excludes jingles) that exist in the /restricted/ directory are flagged as restricted

* MP3 files that already exist in the database are updated using an UPSERT command

* MP3 files that no longer exist on the file system are tagged as orphaned for administrative
review and possible removal





#### Deleted MP3 files
Tags that have been removed from the file system are not deleted from the database but rather marked as
orphaned. This is to prevent accidental deletions due to any possible code errors. Orphaned ID3 tags will
be re-activated if they are added back into the file system at the same file system path.

#### config.json
The indexer processes MP3 files as declared in the
__[config.json](/index.html?md=pages_config.md)__
 file. Records for MP3 songs and MP3 jingles are store in separate DB collections.

* MP3 songs > mp3s DB collection
* MP3 jingles > jingles DB collection

```bash
"mp3_paths":["/var/media/aindra"],
"jingle_paths":["/var/media/jingles"],
```


___
<div style="margin:0 auto;text-align:center;">END</div>
