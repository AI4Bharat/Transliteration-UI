#!/bin/env node

var express = require('express');
var http    = require('http')
  , fs      = require('fs')
  , path    = require('path');

// var ipaddr  = process.env.VARNAM_IP_ADDRESS;
// var port    = process.env.VARNAM_WEB_PORT || 3000;
var port = process.env.PORT || 3000;

// Create "express" server.
app  = express();

app.configure(function(){
  app.set('port', port);
  app.set('root_directory', __dirname);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view cache', true);
  app.use(express.favicon());
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

// if (typeof ipaddr === "undefined") {
//    console.warn('No IP_ADDRESS environment variable');
// }

//  terminator === the termination handler.
function terminator(sig) {
   if (typeof sig === "string") {
      console.log('%s: Received %s - terminating Node server ...',
                  Date(Date.now()), sig);
      process.exit(1);
   }
   console.log('%s: Node server stopped.', Date(Date.now()) );
}

//  Process on exit and signals.
process.on('exit', function() { terminator(); });

['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'
].forEach(function(element, index, array) {
    process.on(element, function() { terminator(element); });
});

// if (process.env.VARNAM_NO_MYSQL === undefined) {
//   var db = require("./lib/varnamdb");
//   db.createSchema();
// }

var routes  = require('./routes')

//  And start the app on that interface (and port).
app.listen(port, function() {
   console.log('%s: Node server started on port:%d ...', Date(Date.now() ),
               port);
});
