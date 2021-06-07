const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cluster = require('cluster');
const path = require('path');
const logger = require('morgan');

const port = 3000;
// const root = path.dirname( __dirname );
const cCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Create a worker for each CPU
  for (let i = 0; i < cCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online.`);
  });
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died.`);
  });
} else {
  const app = express();
  app.use(logger('combined'));
  app.use(compression());
  app.use(express.static(path.join(__dirname, 'html')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
  });

  app.use(bodyParser).listen(port);
}

