const express = require('express');
const bodyParser = require('body-parser')
const compression = require('compression')
const cluster = require('cluster')
const path = require('path')
var logger = require('morgan');




var port    = 8080;
// var root    = path.dirname( __dirname );
var cCPUs   = require('os').cpus().length;

if( cluster.isMaster ) {
  // Create a worker for each CPU
  for( var i = 0; i < cCPUs; i++ ) {
    cluster.fork();
  }

  cluster.on( 'online', function( worker ) {
    console.log( 'Worker ' + worker.process.pid + ' is online.' );
  });
  cluster.on( 'exit', function( worker, code, signal ) {
    console.log( 'worker ' + worker.process.pid + ' died.' );
  });
}
else {
  var app    = express();
  app.use(logger('combined'));
  app.use(compression())
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app
    .use( bodyParser )
    .listen( port );
}