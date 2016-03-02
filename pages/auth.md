<div class="page-header">
  <h1  id="page-title">Authentication</h1>
</div>

The API supports Basic Authentication over SSL as defined in RFC2617 with a few slight differences.
The main difference is that the RFC requires unauthenticated requests to be answered with
401 Unauthorized responses. In many places, this would disclose the existence of user data.
Instead, the API responds with 404 Not Found. This may cause
problems for HTTP libraries that assume a 401 Unauthorized response.
The solution is to manually craft the Authorization header.

Calls for authentication that do not use SLL will receive a 404 Not Found error. This is also
to prevent the disclosure of user data.


<pre style="margin-left:30px"><code class="language-bash line-numbers">// BASH
curl -v -u account:password --header "Accept-Version: 1.0.0" https://localhost:8081/playlists | python -m json.tool

// Request Header sent
...
> GET /playlists HTTP/1.1
> Host: localhost:8081
> Authorization: Basic YWNjb3VudDpwYXNzd29yZA==
> User-Agent: curl/7.43.0
> Accept: */*
> Accept-Version: 1.0.0
...
</code></pre>

___
