<div class="page-header">
  <h1  id="page-title">Setup > Node Modules</h1>
</div>

The audio-streaming-apis project requires the following NPM modules.



```json
"dependencies": {
    "async": "^1.5.2",
    "jsmediatags": "^3.0.5",
    "mongodb": "^2.1.7",
    "path": "^0.12.7",
    "recursive-readdir": "^1.3.0",
    "restify": "^4.0.4"
  }
```

* ##### async
Used to make parallel async calls to the database.

* ##### jsmediatags
Used to parse mp3 files to extract ID3 tags.

* ##### mongodb
Driver for the MongoDB database.

* ##### recursive-readdir
Used to recursively read the files and directories by the Indexer which
extracts the ID3 tag information.

* ##### restify
The RESTful framework used to route the API endpoints.


___
#### Updating the modules
The --save will update the package.json file as the modules are download from the NPM
package manager.

```bash
npm install async --save
npm install jsmediatags --save
npm install mongodb --save
npm install path --save
npm install recursive --save
npm install restify --save
```
___
