const express = require("express");
const cluster = require("cluster");
const os = require("os");
const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event loop is blcocked...
  }
}

app.get("/", (req, res) => {
  // JSON.stringify()
  res.send(`Performance example: ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Ding Dong : ${process.pid}`);
});

console.log("Server is running..");
if (cluster.isMaster) {
  console.log("Master has been started...");
  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log("Worker procee started...");
  app.listen(3000);
}
