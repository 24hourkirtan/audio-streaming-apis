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
## Start the API server w/Forever

Start the API server using the required environment (development, stage, or production).
```bash
$ export SET NODE_ENV=production
$ forever start app.js
```

___
## Tail logs (optional)
```bash
$ forever logs

info:    Logs for running Forever processes
data:        script    logfile                         
data:    [0] server.js /Users/warren/.forever/UOrx.log

$ tail -F [0] server.js /Users/warren/.forever/UOrx.log
```

___
## Stop Forever
Stop all forever processes.
```bash
$ forever stopall
```

The server can be stopped by its PID if more than one instance of Node.js is running.



___
<div style="margin:0 auto;text-align:center;">END</div>
