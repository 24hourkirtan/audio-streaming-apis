<div class="page-header">
  <h1  id="page-title">APIs > Accounts</h1>
</div>

The mp3s collection holds all id3 information extracted from the available mp3 files
on the fie system. Records are read only and have been written to this collection by the Indexer.

<table id="tbl">
  <colgroup>
    <col>
    <col>
    <col>
  </colgroup>
  <tr>
    <th>Verb</th>
    <th>Endpoint</th>
    <th>Summary</th>
  </tr>
  <tr><td>GET</td><td>/account/token</td><td>returns a user's JWT token, user/pswd in header required</td></tr>
  <tr><td>GET</td><td>/account</td><td>gets account information for the current user</td></tr>
</table>


___
