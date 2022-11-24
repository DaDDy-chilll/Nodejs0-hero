const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/home", (req, res) => {
  res.render("home");
});

server.listen(3000, () => {
  console.log("Server is running");
});

io.on("connection", (socket) => {
  console.log("User Connected:" + socket.id);
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});
