<div class="page-header">
  <h1  id="page-title">Setup > Forever</h1>
</div>

A simple CLI tool for ensuring that a given node script runs continuously.
Forever is used to start Node.js. This allows Node.js to restart
should it crash.



___
## Install Forever
Download the desired binary using curl via NPM.

```bash
$ [sudo] npm install forever -g
```

___
## Start the project w/Forever
Switch to the project directory. Switch user to "node".
Start the API server using the required environment (development, stage, or production) and authbind
if using a privileged port.
```bash
$ cd /var/[project_path]
$ su - node
$ export SET NODE_ENV=production

# non-privileged port
$ forever start server.js

# privileged port
$ authbind --deep forever start server.js
```

___
## Tail logs (optional)
```bash
$ su - node
$ forever list

info:    Forever processes running
data:        uid  command         script    forever pid   id logfile                        uptime         
data:    [1] ldYN /usr/bin/nodejs server.js 28844   28849    /home/warren/.forever/ldYN.log 0:0:0:5.465

$ tail -F -n200 /Users/warren/.forever/ldYN.log
```

___
## Stop Forever
Stop all forever processes.
```bash
$ su - node
$ forever stopall
```

The project can be stopped by its PID if more than one instance of Node.js is running.







___
<div style="margin:0 auto;text-align:center;">END</div>
