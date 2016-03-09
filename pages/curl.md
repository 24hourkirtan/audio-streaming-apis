<div class="page-header">
  <h1  id="page-title">CURL</h1>
</div>

CURl is the easiest way to test and explore the API endpoints during development. The use of JWT tokens can make the
use of CURL challenging due to the long text string that makes up a token. Also the Accept-Version header value
adds even more complexity. A solution is to have CURL read Header values from a file.

```bash
curl -v -k -H "jwt: 8dudsfudsfds8f78sf434538534934953495353534mfh23fmm5m252" -H "Accept-Version: 1.0.0" https://localhost:8081/playlists | python -mjson.tool

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
    "email": "me@domain.com",
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhaWQiOiJtZUBkb21haW4uY29tIiwiYXBwS2V5IjoiaG9zZGppOHNqamtqc2Q5OTlzZDlzZCIsImlhdCI6MTQ1NzM4MTg5MH0.GzIrRmkT4YJv-OnwDbaFHFdgRt4tNszoHHhUEXti0jM"
}
```

<br/>
Create a file (usually the home directory).
```bash
cd ~

nano headers.txt

# File contents
jwt: token-receieved-goes-here
Accept-Version: 1.0.0
```

<br/>
Now make all CURL calls using the header.
```bash
cd ~

curl -v -k -H "$(cat headers.txt)" https://localhost:8081/playlists | python -mjson.tool

[
    {
        "_id": "23423r23f2-232f-2f2f2ff",
        "mp3": [
            {
                "_id": "1212312-d123d23d23-d3d233"
            },
            {
                "_id": "7897789-34f234t23t-r34r3434v34"
            }
        ],
        "name": "my_playlist",
        "owner_id": "123412e123e-2d223d32-d23d2f23f"
    }
]
```





___
#### POST and PATCH
POST and PATCH, and DEL will require additional parameters to execute.

* __-X POST:__ indicating the curl execution is a POST
* __-H "Content-Type: application/json":__ a second header indicator that the data passed is JSON
* __-d '{"email":"me@domain.com","pswd":"passData"}'__ the JSON data passed


___
#### DELETE
DELETE will require one additional parameter to execute. DELETEs will carry :id in the url.

* __-X POST:__ indicating the curl execution is a POST



___
