const PORT = process.env.PORT || 8000;
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
