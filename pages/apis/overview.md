<div class="page-header">
  <h1  id="page-title">APIs > Overview</h1>
</div>

The below quick list reflects a brief summary of all the RESTful endpoints available
in the system for version 1.0.0. The second column indicates the endpoint is ready for use during
the development stage of the displayed version. All endpoints use https (SSL) only, http is not supported.
All endpoints return a JSON object or an array of JSON objects.



___
#### Summary

<table id="tbl">
<colgroup>
    <col>
    <col>
    <col>
  </colgroup>
  <tr>
    <th>Endpoint</th>
    <th>v1.0.0 (active)</th>
    <th>JWT</th>
    <th>Description</th>
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
    <td></td>
    <td>Basic</td>
    <td>authentication: returns a user's JWT token, Basic Auth in header required</td>
  </tr>
  <tr>
    <td NOWRAP>GET /account</td>
    <td></td>
    <td>X</td>
    <td>gets account information for the current user</td>
  </tr>
    <td NOWRAP>POST /account</td>
    <td></td>
    <td>Basic</td>
    <td>creates a new account with Basic Auth header credentials, returns jwt token</td>
  </tr>
    <td NOWRAP>PATCH /account</td>
    <td></td>
    <td>X</td>
    <td>updates the account for the current</td>
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
    <td NOWRAP>PATCH /playlist</td>
    <td></td>
    <td>X</td>
    <td>updates a playlist for the current user</td>
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
    <td>gets a list of mp3 records for the current user, includes filtering/sort/paging options</td>
  </tr>
  <tr>
    <td NOWRAP>GET /mp3s/:\_id</td>
    <td>X</td>
    <td>X</td>
    <td>gets a single mp3 record for the current user</td>
  </tr>

</table>

<br/>
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
