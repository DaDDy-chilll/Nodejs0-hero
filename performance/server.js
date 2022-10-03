const express = require("express");
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
  delay(4000);
  res.send(`Beep Beeep Beep : ${process.pid}`);
});

console.log("Server is running..");
console.log("Worker procee started...");
app.listen(3000);
