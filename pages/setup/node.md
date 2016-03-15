<div class="page-header">
  <h1  id="page-title">Setup > Node.js</h1>
</div>

The following are instructions to install and configure Node.js on Ubuntu. This setup is for a standalone
server with no cluster configuration. Forever is installed and used to start Node.js. This allows Node.js to restart
should it crash.


___
### Debian and Ubuntu based distribution
Node.js is available from the __[NodeSource](https://nodesource.com/)__
Debian and Ubuntu binary distributions repository
(formerly Chris Lea's Launchpad PPA). Support for this repository, along with its scripts,
can be found on GitHub at
__[nodesource/distributions](https://github.com/nodesource/distributions)__.

___
### Download the binary
Download the desired binary using curl.

```bash
$ cd ~
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
```
```bash
$ sudo apt-get install nodejs
```

#### PATH
Verify /usr/local/bin is in the PATH


___
<div style="margin:0 auto;text-align:center;">END</div>
