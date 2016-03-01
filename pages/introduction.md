<div class="page-header">
  <h1  id="page-title">Introduction</h1>
</div>

The audio-streaming-apis repository maintains all the REST Apis used by the mobile app
from the audio-streaming-app repository.

The server is build with __[Node.js](http://nodejs.org)__ using the __[Restify](http://www.restify.com)__ framework.
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
Restify is a Node.js module to build real REST web services.

<div style="margin:0 auto;text-align:center;">
![alt text](img/nodejs.png)
![alt text](img/restify.png)
</div>

<!-- http://www.restapitutorial.com/lessons/httpmethods.html -->
___
#### Using HTTP Methods for RESTful Services
The HTTP verbs comprise a major portion of our “uniform interface” constraint and provide us the action counterpart to the noun-based resource. The primary or most-commonly-used HTTP verbs (or methods, as they are properly called) are POST, GET, PUT, PATCH, and DELETE. These correspond to create, read, update, and delete (or CRUD) operations, respectively. There are a number of other verbs but are utilized less frequently. Of those less-frequent methods, OPTIONS and HEAD are used more often than others.

Below is a list summarizing recommended return values of the primary HTTP methods in combination with the resource URIs:

__Entire Collection__ (e.g. /playlists)  
__Specific Item__ (e.g. /playlists/{id})

* __ _Verb POST_ __  
  __CRUD:__ Create  
  __Entire Collection:__ 201 (Created), 'Location' header with link to /playlists/{_id} containing new ID.  
  __Specific Item:__ 404 (Not Found), 409 (Conflict) if resource already exists.  

* __ _Verb GET_ __    
  __CRUD:__ Read  
  __Entire Collection:__ 200 (OK), list of playlists. Use pagination, sorting and filtering to navigate big lists.  
  __Specific Item:__ 200 (OK), single playlist. 404 (Not Found), if ID not found or invalid.  

* __ _Verb PUT_ __    
  __CRUD:__ Update/Replace  
  __Entire Collection:__ 404 (Not Found), unless you want to update/replace every resource in the entire collection.  
  __Specific Item:__ 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.   


* __ _Verb PATCH_ __    
  __CRUD:__ Update/Modify  
  __Entire Collection:__ 404 (Not Found), unless you want to modify the collection itself.  
  __Specific Item:__ 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.

* __ _Verb DELETE_ __    
  __CRUD:__ Delete  
  __Entire Collection:__ 404 (Not Found), unless you want to delete the whole collection—not often desirable.  
  __Specific Item:__ 200 (OK). 404 (Not Found), if ID not found or invalid.

___
