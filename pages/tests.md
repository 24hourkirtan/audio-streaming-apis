<div class="page-header">
  <h1  id="page-title">Unit Tests</h1>
</div>

Unit tests run against both public and secure endpoints. Prior to running the tests
the address and port of the server must be part of the config.json file.

#### Test tools
These test tools are part of the dev-dependancies.
* Mocha

* Prompt

* SuperTest

* Should

___
## config.json
Add or update the config.json file with the required address and port.
See the
__[config.json](/index.html?md=pages_config.md)__ section for more information.


```json
{
  "development":{
    ...
    "port":8081,
    "address":"localhost"
  },
  "stage":{
    ...
    "port":443,
    "address":"api.kirtan.io"
},
  "production":{
    ...
    "port":443,
    "address":"address"
 }
}
```

___
## Run the tests
During the test there is a prompt for a valid account (email/password) which is required
to download a valid JWT token to make secure endpoint calls.

```bash
$ cd &lt;root-of-project>
$ npm test
```






___
<div style="margin:0 auto;text-align:center;">END</div>
