<div class="page-header">
  <h1  id="page-title">APIs > Overview</h1>
</div>

The below quick list reflects a brief summary of all the RESTful services available
in the system for version 1.0.0. The state column indicates the endpoint is ready for use during
the development stage of the displayed version.

All RESTful services return JSON object.


___
#### Summary

<table id="tbl">
<colgroup>
    <col>
    <col>
    <col>
    <col>
  </colgroup>
  <tr>
    <th>Endpoint</th>
    <th>v1.0.0 (active)</th>
    <th>Authentication</th>
    <th>SSL</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>POST /ping</td>
    <td>X</td>
    <td></td>
    <td></td>
    <td>is alive test</td>
  </tr>

  <!-- ACCOUNTS ------------ -->
  <tr>
    <td>POST /account/:account</td>
    <td></td>
    <td>JWT token</td>
    <td></td>
    <td>creates a new account with JSON object passed, returns jwt token</td>
  </tr>
  <tr>
    <td>GET /account/token</td>
    <td></td>
    <td>Basic</td>
    <td></td>
    <td>returns a user's JWT token, user/pswd in header required</td>
  </tr>
  <tr>
    <td>GET /account</td>
    <td></td>
    <td>JWT token</td>
    <td></td>
    <td>gets account information for the current user</td>
  </tr>



  <tr>
    <td><a href="index.html?md=pages_apis_playlists.md">GET /playlists</a></td>
    <td></td>
    <td>JWT token</td>
    <td>X</td>
    <td>gets all playlists for the current user</td>
  </tr>


  <tr>
    <td>GET /playlist/:id</td>
    <td></td>
    <td>JWT token</td>
    <td>X</td>
    <td>gets a single playlist for the current user</td>
  </tr>
  <tr>
    <td>PUT /playlist/:id</td>
    <td></td>
    <td>JWT token</td>
    <td>X</td>
    <td>creates a playlist for the current user</td>
  </tr>
  <tr>
    <td>POST /playlist/:id</td>
    <td></td>
    <td>JWT token</td>
    <td>X</td>
    <td>update a playlist for the current user</td>
  </tr>
  <tr>
    <td>DELETE /playlist/:id</td>
    <td></td>
    <td>JWT token</td>
    <td>X</td>
    <td>deletes a playlist for the current user</td>
  </tr>
  <!-- MP3s ----------------------- -->
  <tr>
    <td>GET /mp3s</td>
    <td>X</td>
    <td>JWT token</td>
    <td>X</td>
    <td>gets a list of mp3 records with optional parameters</td>
  </tr>
  <tr>
    <td>GET /mp3s/:id</td>
    <td>X</td>
    <td>JWT token</td>
    <td>X</td>
    <td>gets a single mp3 record by id</td>
  </tr>
</table>

<br/>
#### Ionic GET example
The response (res) in the examples below carry the following objects:
* __config__: configuration of the request
* __data__: data from the request
* __headers__: retrieve response header info such as content-type: res.headers('content-type')
* __status__: http status code - ex: 200
* __statusText__: status description

```bash
// Ionic v1 headers inline
var version = '1.0.0';
var token = localstorage.get('jwt');
$http({ method: 'GET', url: '/playlists',
    headers:{"jwt": token, "Accept-Version": version}
})

// OR
// Ionic v1 headers declared (best practice)
$scope.mps3 = [];
$scope.collectionCnt = [];

$scope.getAllMp3s =  function(){
    $http.defaults.headers.common['jwt'] = localstorage.get('jwt');
    $http.defaults.headers.common['Accept-Version'] = '1.0.0';
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
