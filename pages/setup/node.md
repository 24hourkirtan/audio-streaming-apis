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
### Using privileged port (443)
On production and stage the privileged port 443 would require starting the project using sudo.
This is an obvious security risk. To run the project without sudo use "authbind" which is a simple
utility for running apps giving them permission to listen on privileged ports (< 1024).
After setting up authbind start the project using __[Forever](/index.html?md=pages_setup_forever.md)__.


```bash
# Install authbind in Debian/Ubuntu
$ sudo apt-get install authbind

# Configure authbind
$ sudo touch /etc/authbind/byport/80
$ sudo chown [user] /etc/authbind/byport/80
$ sudo chmod 755 /etc/authbind/byport/80
```



___
<div style="margin:0 auto;text-align:center;">END</div>
