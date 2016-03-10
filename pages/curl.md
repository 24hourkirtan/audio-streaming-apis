<div class="page-header">
  <h1  id="page-title">CURL</h1>
</div>

CURl is the easiest way to test and explore the API endpoints during development. The use of JWT tokens can make the
use of CURL challenging due to the long text string that makes up a token. Also the Accept-Version and
Content-Type header values
add even more complexity. A solution is to have CURL read Header values from a file.

```bash
curl -v -k \
-H "jwt: eyJ0eXAiOiJKV1QiLCJwMzFkMmMiLCJhcHBLZXkiOiJmZzkmJWlmOCZea2FkczAyM2xkZnMrLS" \
-H "Accept-Version: 1.0.0" \
-H "Content-Type: application/json" \
"https://localhost:8081/playlists" | python -mjson.tool

# becomes

curl -v -k -H "$(cat headers.txt)" https://localhost:8081/playlists | python -mjson.tool
```

___
#### Setting up a header file

The following shows how to create a file with the header info to make CURL calls including a user's
JWT Token.

<br/>
Get a user token.
```bash
curl -v -k -u me@domain.com:xcd834 -H "Accept-Version: 1.0.0" https://localhost:8081/account/token | python -mjson.tool

{
  "_id": "56e15c6744c32f66f031d2c",
  "email": "dude@domain.com",
  "jwt": "eyJ0eXAiOiJKV1QiLCJwMzFkMmMiLCJhcHBLZXkiOiJmZzkmJWlmOCZea2FkczAyM2xkZnMrLS"
}
```

<br/>
Create a header.txt file (usually the home directory). Add the JWT token, Accept-Version, and Content-Type.
```bash
cd ~

nano headers.txt

# File contents
jwt: token-receieved-goes-here
Accept-Version: 1.0.0
Content-Type: application/json
```

<br/>
Now make all CURL calls using the header.
```bash
cd ~

curl -v -k \
-H "$(cat headers.txt)" \
"https://localhost:8081/playlists" \
| python -mjson.tool

[
    {
        "_id": "23423r23f2-232f-2f2f2ff",
        "aid": "123412e123e-2d223d32-d23d2f23f",
        "mp3": [
            {
                "_id": "1212312-d123d23d23-d3d233"
            },
            {
                "_id": "7897789-34f234t23t-r34r3434v34"
            }
        ],
        "name": "my_playlist"

    }
]
```





___
#### POST and PATCH
POST will require additional parameters to execute.

* __-X POST:__ indicating the curl execution is a POST
* __-H "Content-Type: application/json":__ a second header indicator that the data passed is JSON
* __-d '{"email":"me@domain.com","pswd":"passData"}'__ the JSON input data passed


___
####PATCH
PATCH will require additional parameters to execute. DELETEs will carry :\_id in the url query string

* __-X PATCH:__ indicating the curl execution is a PATCH
* __-H "Content-Type: application/json":__ a second header indicator that the data passed is JSON
* __-d '{"email":"me@domain.com","pswd":"passData"}'__ the JSON input data passed

___
#### DELETE
DELETE will require one additional parameter to execute. DELETEs will carry :\_id in the url query string.

* __-X DELETE:__ indicating the curl execution is a DELETE


___
