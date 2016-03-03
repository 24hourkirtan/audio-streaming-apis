<div class="page-header">
  <h1  id="page-title">APIs > Overview</h1>
</div>

The below quick list reflects a brief summary of all the RESTful services available
in the system for version 1.0.0.

All RESTful services return JSON object.


___
#### Summary

<table id="tbl">
<colgroup>
    <col>
    <col>
  </colgroup>
  <tr>
    <th>Service Call</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>POST /authenticate</td>
    <td>authenticates the call using information from the header</td>
  </tr>
  <tr>
    <td>GET /user</td>
    <td>gets the user account information for the current user</td>
  </tr>
  <tr>
    <td>GET /playlists</td>
    <td>gets all playlists for the current user</td>
  </tr>
  <tr>
    <td>GET /playlist/:id</td>
    <td>gets a single playlist for the current user</td>
  </tr>
  <tr>
    <td>PUT /playlist/:playlist</td>
    <td>creates a playlist for the current user</td>
  </tr>
  <tr>
    <td>POST /playlist/:playlist</td>
    <td>update a playlist for the current user</td>
  </tr>
  <tr>
    <td>DELETE /playlist/:playlist</td>
    <td>deletes a playlist for the current user</td>
  </tr>
</table>
