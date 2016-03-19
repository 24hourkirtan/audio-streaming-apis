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
Start the API server using the required environment (development, stage, or production) and authbind
if using a privileged port.
```bash
$ export SET NODE_ENV=production

# non-privileged port
$ forever start server.js

# privileged port
$ authbind --deep forever start server.js
```

___
## Tail logs (optional)
```bash
$ forever list

info:    Forever processes running
data:        uid  command         script    forever pid   id logfile                        uptime      
data:    [0] sFcF /usr/bin/nodejs server.js 28321   28326    /home/warren/.forever/sFcF.log STOPPED     
data:    [1] ldYN /usr/bin/nodejs server.js 28844   28849    /home/warren/.forever/ldYN.log 0:0:0:5.465

$ tail -F [0] server.js /Users/warren/.forever/ldYN.log
```

___
## Stop Forever
Stop all forever processes.
```bash
$ forever stopall
```

The project can be stopped by its PID if more than one instance of Node.js is running.







___
<div style="margin:0 auto;text-align:center;">END</div>
