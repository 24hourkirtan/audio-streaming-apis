<div class="page-header">
  <h1  id="page-title">Setup > MongoDB</h1>
</div>

The following are instructions to install and configure MongoDB on Ubuntu. This setup is for a standalone
database where no replication is used. Diligent backups must be made when running any database
without replication.

MongoDB can be
installed through the package manager or by using a downloaded binary. These instructions
use the binary install. Instructions for
__[package manager install](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)__
can be viewed on the MongoDB community website.

Visit the
__[downloads page](https://www.mongodb.org/downloads?_ga=1.72465872.2135796909.1453758475#production)__
at the MongoDB community website for reference beyond these instructions
for a binary install.


___
### Download the binary

Download the desired binary using curl.

```bash
$ cd ~
$ curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1404-3.2.4.tgz
```

___
### Extract file from download

```bash
$ cd ~
$ tar -zxvf mongodb-linux-x86_64-ubuntu1404-3.2.4.tgz
```

___
### Move the extracted directory (optional)

Place the directory in a desired location before adding it to the path. This step is optional
as the directory can live anywhere. Logs are not outputted to this directory.


___
### Update path

This setup assumes you will be running mongod as the current user.

```bash
$ cd ~
$ nano .bashrc

# update the PATH
$ export PATH=~/mongodb-linux-x86_64-ubuntu1404-3.2.4/bin:$PATH
```

Reload the .bashrc file after updating the PATH or restart the console session.

```bash
$ source ~/.bashrc
```






___
### DB Data and Logs Directory

Determine the root directory for the database datafiles such as /data/db.  
Set the permissions for /data to the user that will execute mongod. -p makes all directories in
the command. In this example a separate path (/data/logs) is used for logging. Make sure the PATH has
been update in the bashrc file for the user receiving the permissions.

```bash
$ sudo mkdir -p /data/db
$ sudo mkdir -p /data/logs
$ sudo chown -R $USER:$GROUP /data
```


___
### Configuration File

Use or create a config file to start the database with located at /etc/mongod.conf. For detailed
information on the configuration values visit the
__[YAML instructions](http://docs.mongodb.org/master/reference/configuration-options/)__ at MongoDB and a
__[sample YAML](http://dba.stackexchange.com/questions/82591/sample-yaml-configuration-files-for-mongodb)__
sudo nano /etc/mongodb.conf) example on stackexchange.
s
> #### Warning
> <div style="color:red;font-size:small;">Currently the database is running in a non-secure environment on port 27017. Since the port is not available
> to an outside network the database is considered secure. If the port is exposed then authentication must
> be enabled.</div>


The following configuration uses the WiredTiger engine with compression. The data and logs
directories are set. Each DB gets its own directory including the kirtan database. The network
binding must be changed to the proper IP addresses.

```bash
$ sudo nano /etc/mongod.conf

# update the config file
storage:
    dbPath: "/data/db"
    directoryPerDB: true
    journal:
        enabled: true
    engine: "wiredTiger"
    wiredTiger:
        engineConfig:
           cacheSizeGB:  2
           journalCompressor: "snappy"
           directoryForIndexes: true
        collectionConfig:
           blockCompressor: "snappy"
        indexConfig:
           prefixCompression: true
systemLog:
    destination: file
    path: "/data/logs/mongodb.log"
    logAppend: true
    logRotate: "rename"
    timeStampFormat: iso8601-utc

processManagement:
    fork: true
net:
    bindIp: "192.168.2.104,127.0.0.1"
    port: 27017
    wireObjectCheck : false
    unixDomainSocket:
        enabled : true
```

Change permission of config file to the user that will execute mongod.

```bash
$ sudo chown $USER:$GROUP /etc/mongod.conf
```

___
### Swappiness and THP
Some databases will perform better if Swappines is turned off and
THP (Transparent Huge Pages) is disabled. Visit this
__[Couchbase Blog](http://blog.couchbase.com/often-overlooked-linux-os-tweaks)__
to learn more as these can impact MongoDB.




___
### Start/Stop MongoDB

Start MongoDB using a forked process with the configuration in the mongod.conf file. Stop
the process with the --shutdown option.

```bash
$ mongod --config /etc/mongod.conf
$ mongod --shutdown
```




___
#### Useful commands

mongo > db.serverStatus().connections



___
<div style="margin:0 auto;text-align:center;">END</div>
