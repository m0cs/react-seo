import cluster from 'cluster';
import express from 'express';
import os from 'os';
import path from 'path';

import { itemRouter } from './item/item.router';
import { itemsRouter } from './items/items.router';

if (cluster.isMaster) {
  // Count the machine's CPUs
  const cpusCount = os.cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpusCount; i += 1) {
    cluster.fork();
  }

  // Handle closed workers
  cluster.on('exit', (worker: any) => {
    cluster.fork();
  });
} else {
  const app = express(),
    port = process.env.API_PORT || 3000;

  // FE
  // Serve static files from the React app
  //To heroku app
  app.use(express.static(__dirname + '../../../app/build'));

  // Items API endpoints
  //
  // List items query endpoint
  app.use('/api/items', itemsRouter);
  // Get item by id endpoint
  app.use('/api/items/', itemRouter);

  //To heroku app url access.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../app/build/index.html'));
  });

  // Start server
  app.listen(port, () => {
    console.log(`Cluster ${cluster.worker.process.pid} API port: ${port}`);
  });
}
