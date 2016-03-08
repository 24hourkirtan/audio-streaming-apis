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
  <tr>
    <td>POST /account/token</td>
    <td></td>
    <td>Basic</td>
    <td>X</td>
    <td>returns a user's JWT token, user/pswd in header required</td>
  </tr>


  <tr>
    <td>GET /user</td>
    <td></td>
    <td>JWT token</td>
    <td>X</td>
    <td>gets the user account information for the current user</td>
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
</table>

<br/>
#### Ionic GET

```bash
// Ionic v1
var version = '1.0.0';
var token = localstorage.get('jwt');
$http({ method: 'GET', url: '/playlists',
        headers:{"jwt": token, "Accept-Version": version}
    })
```

___
