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
  <tr><td>POST</td><td>/account</td><td>creates a new account with Basic Auth header credentials, returns jwt token</td></tr>
  <tr><td>PATCH</td><td>/account/:\_id</td><td>updates the account for the current user</td></tr>

</table>




<!-- GET /account/token ----------------------------------------- -->
<br/>
___
### GET /account/token

Returns the user's jwt token after performing a database lookup of the user's email and password which
are part of the request header as Authentication Basic. The endpoint is used for local login. For "local" logins the pswd
is the user's password. For "facebook" logins the pswd is the Facebook oAuth token.

<br/>
#### Parameters
* None

#### Inputs
* None

<br/>
#### Returns
```bash
{
    "_id": "56e15c6744c32f686f031d2c",
    "email": "ted@domain.com",
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhaWQiOiI1NmUxNWM2NzQ0YzMyZjY4NmYwMzFkMmMiLCJhcHBLZXkiOiJmZzkmJWlmOCZea2yM2xkZnMrLSkwOWRzZmtrIiwiaWF0IjoxNDU3NjIwMDE2fQ.xoBCzhnNSX6kMaFLeDyzIV5jOF-1w1-3FGkR5V-VXQE"
}
```

<br/>
#### Examples

<br/>
Gets the user's jwt token using their credentials included in the request header.
```bash
curl -v -k -u email:pswd \
-H "Accept-Version: 1.0.0" \
"https://localhost:8081/account/token" \
| python -mjson.tool
```

```javascript
var auth = 'Basic '+ btoa(email+':'+pwsd);
$http.defaults.headers.common['Authorization'] = auth;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http({ method:'GET',
        url:'https://192.168.0.14:8081/account/token'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```



<!-- POST /account ----------------------------------------- -->
<br/>
___
### POST /account

Create a new user account using the email and password which
are part of the request header as Authentication Basic
then returns the user's jwt token.

<br/>
#### Parameters
* None

<br/>
#### Inputs
<table id="tbl">
  <colgroup><col><col><col></colgroup>
  <tr><th>Name</th><th>Type</th><th>Description</th></tr>
  <tr><td>email</td><td>string</td><td>The user's email also used as their login ID.</td></tr>
  <tr><td>pswd</td><td>string</td><td>The user's pswd.</td></tr>
  <tr><td>type</td><td>string</td><td>Login type (local, facebook).
      For Facebook the pswd must be the Facebook token.</td></tr>
</table>
##### Example Input
```json
{
  "email": "ted@domain.com",
  "pswd": "the-password",
  "type": "local"
}
```

<br/>
#### Returns
```bash
{
    "_id": "56e15c6744c32f686f031d2c",
    "email": "ted@domain.com",
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhaWQiOiI1NmUxNWM2NzQ0YzMyZjY4NmYwMzFkMmMiLCJhcHBLZXkiOiJmZzkmJWlmOCZea2yM2xkZnMrLSkwOWRzZmtrIiwiaWF0IjoxNDU3NjIwMDE2fQ.xoBCzhnNSX6kMaFLeDyzIV5jOF-1w1-3FGkR5V-VXQE"
}
```

<br/>
#### Examples

<br/>
Create a new account.
```bash
curl -v -k \
-H "Content-Type: application/json" \
-H "$(cat headers.txt)" \
-d '{"email":"ted@mydomian.com", "pswd":"the-password"}' \
"https://localhost:8081/account" | python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'POST',
        url:'https://192.168.0.14:8081/account',
        data:{email:'ted@mydomian.com', pswd:'the-password'}})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```


___
