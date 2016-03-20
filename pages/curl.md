<div class="page-header">
  <h1  id="page-title">CURL</h1>
</div>

CURl is the easiest way to test and explore the API endpoints during development. The use of JWT tokens can make the
use of CURL challenging due to the long text string that makes up a token. Also the Accept-Version and
Content-Type header values
add even more complexity. A solution is to have CURL read Header values from a file.

```bash
$ curl -v -k \
-H "jwt: eyJ0eXAiOiJKV1QiLCJwMzFkMmMiLCJhcHBLZXkiOiJmZzkmJWlmOCZea2FkczAyM2xkZnMrLS" \
-H "Accept-Version: 1.0.0" \
-H "Content-Type: application/json" \
"https://localhost:8081/playlists" | python -mjson.tool

# becomes
$ curl -v -k -H "$(cat header-stage.txt)" https://localhost:8081/playlists | python -mjson.tool
```

* __jwt:__ the JSON Web Token assigned to the user for the environment accessed (dev, stage, prod)
* __Accept-Version:__ the API version of the endpoint to execute at the server
* __Content-Type:__ the type of data sent in the body (JSON)

> <span style="font-size:small;color:red;">A common error from endpoints (POST and PATCH) when an invalid
or missing Content-Type is passed.<br/>
"message": "submission data missing or invalid"</span>  

___
#### Setting up a header file

The following shows how to create a file with the header info to make CURL calls including a user's
JWT Token.

First get a user JWT token using a valid __-u email/password__ pair. The token is needed to place in the file.
```bash
$ curl -v -k -u me@domain.com:xcd834 -H "Accept-Version: 1.0.0" https://localhost:8081/account/token | python -mjson.tool

# account record with token is returned
{
  "_id": "56e15c6744c32f66f031d2c",
  "email": "dude@domain.com",
  "jwt": "eyJ0eXAiOiJKV1QiLCJwMzFkMmMiLCJhcHBLZXkiOiJmZzkmJWlmOCZea2FkczAyM2xkZnMrLS"
}
```

Next create a header file (usually the home directory). Add the JWT token, Accept-Version, and Content-Type.
Optionally create a different header file for dev, stage, and prod as the JWT token returned is different for each.

> <span style="font-size:small;color:red;">Be careful not to allow blank lines at the beginning of the file contents.</span>

```bash
$ cd ~

$ nano header-stage.txt

# File contents
jwt: token-receieved-goes-here
Accept-Version: 1.0.0
Content-Type: application/json
```


Lastly make all CURL calls using the header file.
```bash
$ cd ~

$ curl -v -k \
-H "$(cat header-stage.txt)" \
"https://localhost:8081/playlists" \
| python -mjson.tool


# Results
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
#### POST
Requires no parameters to execute. Uses inputs (-d).

* __-X POST:__ indicating the curl execution is a POST
* __-H "Content-Type: application/json":__ a second header indicator that the data passed is JSON
* __-d '{"email":"me@domain.com","pswd":"passData"}'__ the JSON input data passed


___
#### PATCH
PATCH requires one parameter to execute, the \_id. Uses inputs (-d);

* __-X PATCH:__ indicating the curl execution is a PATCH
* __-H "Content-Type: application/json":__ a second header indicator that the data passed is JSON
* __-d '{"email":"me@domain.com","pswd":"passData"}'__ the JSON input data passed

___
#### DELETE
DELETE requires one parameter to execute, the \_id. Uses no inputs.

* __-X DELETE:__ indicating the curl execution is a DELETE



___
<div style="margin:0 auto;text-align:center;">END</div>
