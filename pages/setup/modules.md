<div class="page-header">
  <h1  id="page-title">Setup > Node Modules</h1>
</div>

The audio-streaming-apis project requires the following NPM modules.



```json
"dependencies": {
  "co": "^4.6.0",
  "forEachAsync": "^3.0.0",
  "jsonwebtoken": "^5.7.0",
  "mongodb": "^2.1.7",
  "musicmetadata": "^2.0.2",
  "path": "^0.12.7",
  "recursive-readdir": "^1.3.0",
  "restify": "^4.0.4"
  }
  ,
"devDependencies": {
  "mocha": "^2.4.5",
  "prompt": "^1.0.0",
  "should": "^8.2.2",
  "supertest": "^1.2.0"
  }
```

#### dependencies
* __co__<br/>
Generator based control flow for Nodejs, using promises, allows non-blocking code.

* __forEachAsync__<br/>
Used by the Indexer to make async calls in series to the database.


* __jsonwebtoken__<br/>
Used to create and parse JSON Web Tokens.

* __mongodb__<br/>
Driver for the MongoDB database.

* __musicmetadata__<br/>
Used to parse mp3 files to extract ID3 tags.

* __path__<br/>
Functions that operate on paths.

* __recursive-readdir__<br/>
Used to recursively read the files and directories by the Indexer which
extracts the ID3 tag information.

* __restify__<br/>
The RESTful framework used to route the API endpoints.


#### devDependencies
* __mocha__<br/>
Unit testing framework.

* __supertest__<br/>
High-level abstraction for testing HTTP.

* __should__<br/>
Test framework agnostic BDD-style assertions.


___
#### Installing the modules
The --save and --save--dev parameters will update the package.json file as the modules are download with the NPM
package manager.

```bash
$ npm install co --save
$ npm install forEachAsync --save
$ npm install jsonwebtoken --save
$ npm install mongodb --save
$ npm install musicmetadata --save
$ npm install path --save
$ npm install recursive --save
$ npm install restify --save

$ npm install mocha --save--dev
$ npm install supertest --save--dev
$ npm install should --save--dev
```


___
<div style="margin:0 auto;text-align:center;">END</div>
