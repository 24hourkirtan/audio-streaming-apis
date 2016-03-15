<div class="page-header">
  <h1  id="page-title">Endpoints > Overview</h1>
</div>

The below quick list reflects a brief summary of all the RESTful endpoints available
in the system for version 1.0.0. The second column indicates the endpoint is ready for use during
the development stage of the displayed version. All endpoints use https (SSL) only, http is not supported.
All endpoints return a JSON object or an array of JSON objects.

<!-- http://www.restapitutorial.com/lessons/httpmethods.html -->

___
#### Using HTTP Methods for RESTful Services
The HTTP verbs comprise a major portion of our “uniform interface” constraint and provide us the action counterpart to the noun-based resource. The primary or most-commonly-used HTTP verbs (or methods, as they are properly called) are POST, GET, PUT, PATCH, and DELETE. These correspond to create, read, update, and delete (or CRUD) operations, respectively. There are a number of other verbs but they are utilized less frequently. Of those less-frequent methods, OPTIONS and HEAD are used more often than others.

Below is a list summarizing the return values of the primary HTTP methods used.

Note that PUT is not currently used by these APIs. PATCH more accurately reflects the update/modify mode of a MongoDB database
which is not normally an update/replace db engine. In addition the APIs do not delete and recreate records during modify.

__Entire Collection__ (e.g. GET /playlists)  
__Specific Item__ (e.g. GET /playlist/:\_id)  

* __ _Verb POST_ __  
  __CRUD:__ Create  
  __Entire Collection:__ 201 (Created), 'Location' header with link to /playlists/:\_id containing new ID.  
  __Specific Item:__ 404 (Not Found), 409 (Conflict) if resource already exists.  

* __ _Verb GET_ __    
  __CRUD:__ Read  
  __Entire Collection:__ 200 (OK), list of playlists. Use pagination, sorting and filtering to navigate big lists.  
  __Specific Item:__ 200 (OK), single playlist. 404 (Not Found), if ID not found or invalid.  

* __ _Verb PATCH_ __    
  __CRUD:__ Update/Modify  
  __Entire Collection:__ 404 (Not Found), unless modifying the collection itself.  
  __Specific Item:__ 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.

* __ _Verb DELETE_ __    
  __CRUD:__ Delete  
  __Entire Collection:__ 404 (Not Found), unless deleting the whole collection — not often desirable.  
  __Specific Item:__ 200 (OK). 404 (Not Found), if ID not found or invalid.


___
#### Endpoint Summary

<table id="tbl">
<colgroup><col><col><col></colgroup>
  <tr>
    <th>Endpoint</th><th>v1.0.0 (active)</th><th>JWT</th><th>Description</th>
  </tr>
  <tr>
    <td>POST /ping</td>
    <td>X</td>
    <td></td>
    <td>is alive test</td>
  </tr>

  <!-- ACCOUNTS ------------ -->
  <tr>
    <td NOWRAP>GET /account/token</td>
    <td>X</td>
    <td>Basic</td>
    <td>login: returns a user's JWT token, email/password in header required</td>
  </tr>
  <tr>
    <td NOWRAP>GET /account</td>
    <td>X</td>
    <td>X</td>
    <td>gets account information for the current user</td>
  </tr>
    <td NOWRAP>POST /account</td>
    <td>X</td>
    <td>Basic</td>
    <td>creates a new account with Basic Auth header credentials, returns jwt token</td>
  </tr>
    <td NOWRAP>PATCH /account/:\_id</td>
    <td>X</td>
    <td>X</td>
    <td>modify the account for the current user</td>
  </tr>
  </tr>
    <td NOWRAP>PATCH /account/password/:\_id</td>
    <td>X</td>
    <td>X</td>
    <td>modify the account password for the current user</td>
  </tr>



  <!-- PLAYLISTS ----------------------------------- -->
  <tr>
    <td NOWRAP>GET /playlists</td>
    <td></td>
    <td>X</td>
    <td>gets all playlists for the current user, includes filtering/sort/paging options</td>
  </tr>
  <tr>
    <td NOWRAP>GET /playlist/:\_id</td>
    <td></td>
    <td>X</td>
    <td>gets a single playlist for the current user</td>
  </tr>
  <tr>
    <td NOWRAP>POST /playlist</td>
    <td></td>
    <td>X</td>
    <td>creates a playlist for the current user</td>
  </tr>
  <tr>
    <td NOWRAP>PATCH /playlist/:\_id</td>
    <td></td>
    <td>X</td>
    <td>modify a playlist for the current user</td>
  </tr>
  <tr>
    <td NOWRAP>DELETE /playlist/:\_id</td>
    <td></td>
    <td>X</td>
    <td>deletes a playlist for the current user</td>
  </tr>

  <!-- MP3s ----------------------- -->
  <tr>
    <td NOWRAP>GET /mp3s</td>
    <td>X</td>
    <td>X</td>
    <td>gets a list of mp3 records for an authenticated user, includes filtering/sort/paging options</td>
  </tr>
  <tr>
    <td NOWRAP>GET /mp3/:\_id</td>
    <td>X</td>
    <td>X</td>
    <td>gets a single mp3 record for an authenticated user</td>
  </tr>

</table>

___
#### Ionic GET example
The response (res) in the examples below carry the following objects:
* __config__: configuration of the request
* __data__: data requested
* __headers__: retrieve response header info such as content-type: res.headers('content-type')
* __status__: http status code - ex: 200
* __statusText__: status description

```bash
// Ionic v1 headers inline
var version = '1.0.0';
var token = localstorage.get('jwt');
$http({ method: 'GET', url: '/playlists',
        headers:{"jwt": token,
        "Accept-Version": version,
        "Content-Type":"application/json"
      }
})

// OR

// Ionic v1 headers declared (best practice)
$scope.mps3 = [];
$scope.collectionCnt = [];

$scope.getAllMp3s =  function(){
    $http.defaults.headers.common['jwt'] = localstorage.get('jwt');
    $http.defaults.headers.common['Accept-Version'] = '1.0.0';
    $http.defaults.headers.common['Content-Type'] = 'application/json';
    $http({method:'GET', url:'https://localhost:8081/mp3s?image=false'})
    .then(
        function successCallback(res) {
            $scope.mp3s = res.data.mp3s;
            $scope.collectionCnt = res.data._collectionCnt;
        },
        function errorCallback(res) {
            $scope.mp3s = res;
        }
    );
}
```

___
<div style="margin:0 auto;text-align:center;">END</div>
