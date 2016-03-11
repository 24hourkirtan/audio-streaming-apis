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

  <tr><td>GET</td><td><a href="#get.account.token">/account/token</a></td><td>login: returns a user's JWT token, email/password in header required</td></tr>
  <tr><td>GET</td><td><a href="#get.account">/account</a></td><td>gets account information for the current user</td></tr>
  <tr><td>POST</td><td><a href="#post.account">/account</a></td><td>creates a new account with Basic Auth header credentials, returns jwt token</td></tr>
  <tr><td>PATCH</td><td><a href="#patch.account">/account/:\_id</a></td><td>modify the account for the current user</td></tr>
  <tr><td>PATCH</td><td><a href="#patch.account.password">/account/password/:\_id</a></td><td>modify the account password for the current user</td></tr>

</table>



<a name="get.account.token"></a>
<!-- GET /account/token ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
## GET /account/token

Returns the user's jwt token after performing a database lookup of the user's email and password which
are part of the request header as Authentication Basic. This endpoint is used for local login.

<br/>
#### Parameters
* None

<br/>
#### Inputs
* None

<br/>
#### Returns
```json
{
    "_id": "56e15c6744c32f686f031d2c",
    "email": "ted@domain.com",
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

<br/>
#### Examples

<br/>
Gets the user's JWT token using their credentials included in the request header.
```bash
curl -v -k -X GET -u email:pswd \
-H "Accept-Version: 1.0.0" \
"https://localhost:8081/account/token" \
| python -mjson.tool
```

```javascript
var auth = 'Basic '+ btoa(email+':'+pwsd);
$http.defaults.headers.common['Authorization'] = auth;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'https://localhost:8081/account/token'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```





<a name="get.account"></a>
<!-- GET /account ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
## GET /account

Returns the user's account record less the password.

<br/>
#### Parameters
* None

<br/>
#### Inputs
* None

<br/>
#### Returns
```json
{
    "_id": "56e15c6744c32f686f031d2c",
    "email": "ted@domain.com",
    "type": "local"
}
```

<br/>
#### Examples

<br/>
Gets the user's record using the \_id in the JWT token.
```bash
curl -v -k -X GET \
-H "$(cat headers.txt)" \
"https://localhost:8081/account" \
| python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'GET',
        url:'https://localhost:8081/account'})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```


<a name="post.account"></a>
<!-- POST /account ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
## POST /account

Create a new user account of type "local" using the email and password passed as inputs.
Returns the user's JWT token and account record less the password.

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
</table>

##### Example Input
```json
{
  "email": "ted@domain.com",
  "pswd": "the-password"
}
```

<br/>
#### Returns
```json
{
    "_id": "56e15c6744c32f686f031d2c",
    "email": "ted@domain.com",
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

<br/>
#### Examples

<br/>
Create a new account.
```bash
curl -v -k -X POST \
-H "$(cat headers.txt)" \
-d '{"email":"ted@mydomian.com", "pswd":"the-password"}' \
"https://localhost:8081/account" | python -mjson.tool
```

```javascript
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'POST',
        url:'https://localhost:8081/account',
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

<a name="patch.account"></a>
<!-- PATCH /account ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
## PATCH /account/:\_id

Modifies a user account of type "local". The password is not modified by this endpoint, see /account/password/:\_id.
Returns the user's account record less the password.

<br/>
#### Parameters
<table id="tbl">
  <colgroup><col><col><col></colgroup>
  <tr><th>Name</th><th>Type</th><th>Description</th></tr>
  <tr><td>\_id</td><td>string</td><td>The unique \_id assigned to the account. Part of the URI.</td></tr>
</table>
##### Example Parameter
```bash
/account/56e15c6744c32f686f031d2c
```

<br/>
#### Inputs
<table id="tbl">
  <colgroup><col><col><col></colgroup>
  <tr><th>Name</th><th>Type</th><th>Description</th></tr>
  <tr><td>email</td><td>string</td><td>The user's email also used as the login ID.</td></tr>
</table>
##### Example Input
```json
{
  "email": "ted@domain.com",
}
```

<br/>
#### Returns
```json
{
    "_id": "56e15c6744c32f686f031d2c",
    "email": "ted@domain.com",
    "type": "local"
}
```

<br/>
#### Examples

<br/>
Modifies an account.
```bash
curl -v -k -X PATCH \
-H "$(cat headers.txt)" \
-d '{"email":"ted@mydomian.com"}' \
"https://localhost:8081/account/56e15c6744c32f686f031d2c" | python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'PATCH',
        url:'https://localhost:8081/account/56e15c6744c32f686f031d2c',
        data:{email:'ted@mydomian.com'}})
.then(
    function successCallback(res) {
        console.log(res.data);
    },
    function errorCallback(res) {
        console.log(res);
    }
);
```



<a name="patch.account.password"></a>
<!-- PATCH /account/password ----------------------------------------- -->
<!-- -->
<!-- -->
<!-- -->
<br/>
___
## PATCH /account/password/:\_id

Modifies a user's password of type "local".
Returns the user's account record less the password.

<br/>
#### Parameters
<table id="tbl">
  <colgroup><col><col><col></colgroup>
  <tr><th>Name</th><th>Type</th><th>Description</th></tr>
  <tr><td>\_id</td><td>string</td><td>The unique \_id assigned to the account. Part of the URI.</td></tr>
</table>
##### Example Parameter
```bash
/account/password/56e15c6744c32f686f031d2c
```

<br/>
#### Inputs
<table id="tbl">
  <colgroup><col><col><col></colgroup>
  <tr><th>Name</th><th>Type</th><th>Description</th></tr>
  <tr><td>pswd</td><td>string</td><td>The user's pswd.</td></tr>
</table>
##### Example Input
```json
{
  "pswd": "the-password"
}
```

<br/>
#### Returns
```json
{
    "_id": "56e15c6744c32f686f031d2c",
    "email": "ted@domain.com",
    "type": "local"
}
```

<br/>
#### Examples

<br/>
Modifies an account.
```bash
curl -v -k -X PATCH \
-H "$(cat headers.txt)" \
-d '{"pswd":"the-password"}' \
"https://localhost:8081/account/56e15c6744c32f686f031d2c" | python -mjson.tool
```

```javascript
$http.defaults.headers.common['jwt'] = jwt;
$http.defaults.headers.common['Accept-Version'] = '1.0.0';
$http.defaults.headers.common['Content-Type'] = 'application/json';
$http({ method:'PATCH',
        url:'https://localhost:8081/account/56e15c6744c32f686f031d2c',
        data:{pswd:'the-password'}})
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
<div style="margin:0 auto;text-align:center;">END</div>
___
