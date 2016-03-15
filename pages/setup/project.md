<div class="page-header">
  <h1  id="page-title">Setup > Project</h1>
</div>

Download the audio-streaming-apis project (repo) from the GitHub using __git clone__. Install
by the release tag each time the project is upgraded. By downloading each new release
tag into a new unique directory it will be
possible to revert back to an older tag quickly should it be necessary.



___
## Clone repo
Clone the repository by a specific tag and create a unique directory for it.

```bash
# cd to the directory to store the cloned repo
$ cd ~

$ git clone --branch v1.0.0-alpha.2 \
https://github.com/24hourkirtan/audio-streaming-apis.git \
audio-streaming-apis_v1.0.0-alpha.2
```



___
## Update local NPM packages
The repo does not contain the required packages to run the project.

```bash
$ cd ~/audio-streaming-apis_v1.0.0-alpha.2

$ npm update
```


___
## Create config.json
For security reasons the project does not contain the
__[config.json](/index.html?md=pages_config.md)__
 file needed to
to run the project. It must be created once and then copied to each directory that represents a
release tag.


___
## SSL certificates
For security reasons the project does not contain the
__[SSL Certificate](/index.html?md=pages_ssl.md)__
 files needed to
to run the project. They must be added to each directory that represents a
release tag. The config.json file must be updated to reflect the location
of the certificate files.


___
## Start the Forever process
__[Start](/index.html?md=pages_setup_forever.md)__
 the API server using Forever.



___
<div style="margin:0 auto;text-align:center;">END</div>
