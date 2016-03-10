<div class="page-header">
  <h1  id="page-title">Introduction</h1>
</div>

The audio-streaming-apis repository maintains all the REST Apis used by the mobile app
from the audio-streaming-app repository.

The server is build with __[Node.js](http://nodejs.org)__ using the __[Restify](http://www.restify.com)__ framework and backended with
__[MongoDB](https://www.mongodb.org/)__.
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
Restify is a Node.js module to build real REST web services.
MongoDB is popular NoSQL database often used with Node.js and has a string Node.js driver.

<div style="margin:0 auto;text-align:center;">
![alt text](img/nodejs.png)
![alt text](img/restify.png)
![alt text](img/mongodb-logo.png)

</div>


___
The API endpoints provided are completely stand alone. They can be attached to and used to manipulate the database by any client
including CURL.

Currently the endpoints service the Ionic __[audio-streaming-app](https://github.com/24hourkirtan/audio-streaming-app)__ 
found on GitHub. The app can be downloaded on the App and Play Stores.
___
