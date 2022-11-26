const http = require("http");
const io = require("socket.io");

const apiServer = require("./api");
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, { cors: { origin: "*" } });

const PORT = 3000;
const sockets = require("./sockets");

httpServer.listen(PORT);
console.log("server is running on", PORT);

sockets.listen(socketServer);
